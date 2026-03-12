import { NextRequest, NextResponse } from "next/server";
import { Patient } from "@/lib/types";
import fs from "fs";
import path from "path";

let cachedData: Patient[] | null = null;

function loadData(): Patient[] {
  if (cachedData) return cachedData;
  const filePath = path.join(process.cwd(), "data", "data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  cachedData = JSON.parse(raw) as Patient[];
  return cachedData;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit") || "20", 10)),
  );
  const search = searchParams.get("search")?.toLowerCase() || "";
  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "asc";
  const ageFilter = searchParams.get("age") || "";
  const medicalIssueFilter =
    searchParams.get("medical_issue")?.toLowerCase() || "";

  let data = loadData();

  // Search by patient_name
  if (search) {
    data = data.filter((p) => p.patient_name.toLowerCase().includes(search));
  }

  // Filter by age range
  if (ageFilter) {
    const [minStr, maxStr] = ageFilter.split("-");
    const min = parseInt(minStr, 10);
    const max = maxStr ? parseInt(maxStr, 10) : Infinity;
    if (!isNaN(min)) {
      data = data.filter((p) => p.age >= min && p.age <= max);
    }
  }

  // Filter by medical_issue
  if (medicalIssueFilter) {
    data = data.filter(
      (p) => p.medical_issue.toLowerCase() === medicalIssueFilter,
    );
  }

  // Sort
  if (sort === "patient_name" || sort === "age") {
    data = [...data].sort((a, b) => {
      if (sort === "patient_name") {
        const cmp = a.patient_name.localeCompare(b.patient_name);
        return order === "desc" ? -cmp : cmp;
      }
      if (sort === "age") {
        return order === "desc" ? b.age - a.age : a.age - b.age;
      }
      return 0;
    });
  }

  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedData = data.slice(start, start + limit);

  return NextResponse.json({
    data: paginatedData,
    total,
    page,
    limit,
    totalPages,
  });
}
