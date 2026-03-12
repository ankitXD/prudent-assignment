"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Patient, PatientsResponse } from "@/lib/types";
import { getPatients } from "@/lib/getPatients";
import PatientCard from "@/components/patient-card";
import PatientProfile from "@/components/patient-profile";
import PatientTable from "@/components/patient-table";
import SearchBar from "@/components/search-bar";
import Filters from "@/components/filters";
import SortControls from "@/components/sort-controls";
import Pagination from "@/components/pagination";
import Loading from "@/components/loading";
import { AlertCircle, SlidersHorizontal } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<PatientsResponse | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Query state
  const [search, setSearch] = useState("");
  const [medicalIssue, setMedicalIssue] = useState("");
  const [age, setAge] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"table" | "card">("table");

  // 10 rows for table, 12 cards for card view
  const limit = view === "card" ? 12 : 10;

  const sortValue = useMemo(
    () => (sort && order ? `${sort}-${order}` : "default"),
    [sort, order],
  );

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (medicalIssue) count++;
    if (age) count++;
    if (sort) count++;
    return count;
  }, [search, medicalIssue, age, sort]);

  // Collect active filter labels for chips
  const activeFilters = useMemo(() => {
    const filters: { key: string; label: string }[] = [];
    if (search) filters.push({ key: "search", label: `Search: "${search}"` });
    if (medicalIssue)
      filters.push({ key: "medicalIssue", label: medicalIssue });
    if (age) filters.push({ key: "age", label: `Age: ${age}` });
    if (sort) {
      const sortLabels: Record<string, string> = {
        "patient_name-asc": "Name (A-Z)",
        "patient_name-desc": "Name (Z-A)",
        "age-asc": "Age ↑",
        "age-desc": "Age ↓",
      };
      filters.push({
        key: "sort",
        label: sortLabels[`${sort}-${order}`] || "Sorted",
      });
    }
    return filters;
  }, [search, medicalIssue, age, sort, order]);

  const removeFilter = useCallback((key: string) => {
    if (key === "search") {
      setSearch("");
    } else if (key === "medicalIssue") {
      setMedicalIssue("");
    } else if (key === "age") {
      setAge("");
    } else if (key === "sort") {
      setSort("");
      setOrder("");
    }
    setPage(1);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (search) params.set("search", search);
      if (sort) params.set("sort", sort);
      if (order) params.set("order", order);
      if (age) params.set("age", age);
      if (medicalIssue) params.set("medical_issue", medicalIssue);

      const result = await getPatients(params);
      setData(result);
    } catch {
      setError("Failed to load patient data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, sort, order, age, medicalIssue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleMedicalIssueChange = useCallback((value: string) => {
    setMedicalIssue(value);
    setPage(1);
  }, []);

  const handleAgeChange = useCallback((value: string) => {
    setAge(value);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((s: string, o: string) => {
    setSort(s);
    setOrder(o);
    setPage(1);
  }, []);

  const handleOpenPatient = useCallback((patient: Patient) => {
    setSelectedPatient(patient);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleClosePatient = useCallback(() => {
    setSelectedPatient(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue gradient header */}
      <div className="relative overflow-hidden bg-[#3B82F6] px-6 py-8 sm:px-10">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Patient Directory
          </h1>
          <p className="mt-1 text-blue-100">
            {data ? `${data.total} Patient Found` : "Loading..."}
          </p>
        </div>
        {/* Decorative pattern */}
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
          <svg viewBox="0 0 200 120" className="h-full w-full" fill="white">
            <rect x="10" y="10" width="16" height="16" rx="3" />
            <rect x="35" y="10" width="16" height="16" rx="3" />
            <rect x="60" y="10" width="16" height="16" rx="3" />
            <rect x="85" y="10" width="16" height="16" rx="3" />
            <rect x="110" y="10" width="16" height="16" rx="3" />
            <rect x="22" y="35" width="16" height="16" rx="3" />
            <rect x="47" y="35" width="16" height="16" rx="3" />
            <rect x="72" y="35" width="16" height="16" rx="3" />
            <rect x="97" y="35" width="16" height="16" rx="3" />
            <rect x="10" y="60" width="16" height="16" rx="3" />
            <rect x="35" y="60" width="16" height="16" rx="3" />
            <rect x="60" y="60" width="16" height="16" rx="3" />
            <rect x="85" y="60" width="16" height="16" rx="3" />
            <rect x="22" y="85" width="16" height="16" rx="3" />
            <rect x="47" y="85" width="16" height="16" rx="3" />
            <rect x="72" y="85" width="16" height="16" rx="3" />
          </svg>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {!selectedPatient && (
          <>
            {/* View Toggle Tabs */}
            <div className="flex items-center justify-between border-b border-gray-200 pt-4">
              <div className="flex">
                <button
                  onClick={() => {
                    setView("table");
                    setPage(1);
                  }}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    view === "table"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Table View
                </button>
                <button
                  onClick={() => {
                    setView("card");
                    setPage(1);
                  }}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    view === "card"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Card View
                </button>
              </div>

              {activeFilterCount > 0 && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <SlidersHorizontal className="h-4 w-4" />
                  Active Filters: {activeFilterCount}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <SearchBar value={search} onChange={handleSearchChange} />
                <Filters
                  medicalIssue={medicalIssue}
                  age={age}
                  onMedicalIssueChange={handleMedicalIssueChange}
                  onAgeChange={handleAgeChange}
                />
              </div>
              <SortControls value={sortValue} onChange={handleSortChange} />
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pb-4">
                {activeFilters.map((f) => (
                  <span
                    key={f.key}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700"
                  >
                    <span className="capitalize">{f.label}</span>
                    <button
                      onClick={() => removeFilter(f.key)}
                      className="ml-0.5 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <p className="font-medium text-red-600">{error}</p>
            <button
              onClick={fetchData}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && <Loading view={view} count={limit} />}

        {/* Content */}
        {!loading && !error && selectedPatient && (
          <PatientProfile
            patient={selectedPatient}
            onBack={handleClosePatient}
          />
        )}

        {!loading && !error && data && !selectedPatient && (
          <>
            {data.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
                <p className="text-lg font-medium text-gray-800">
                  No patients found
                </p>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <>
                {view === "table" ? (
                  <PatientTable
                    patients={data.data}
                    onSelect={handleOpenPatient}
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.data.map((patient: Patient) => (
                      <PatientCard
                        key={patient.patient_id}
                        patient={patient}
                        onSelect={handleOpenPatient}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="py-6">
                  <Pagination
                    page={data.page}
                    totalPages={data.totalPages}
                    onPageChange={setPage}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
