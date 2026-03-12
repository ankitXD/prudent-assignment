"use client";

import { ChevronDown } from "lucide-react";

const MEDICAL_ISSUES = [
  "allergic reaction",
  "broken arm",
  "ear infection",
  "fever",
  "headache",
  "rash",
  "sinusitis",
  "sore throat",
  "sprained ankle",
  "stomach ache",
];

const AGE_RANGES = [
  { label: "All Ages", value: "all" },
  { label: "0-18", value: "0-18" },
  { label: "19-35", value: "19-35" },
  { label: "36-50", value: "36-50" },
  { label: "51-65", value: "51-65" },
  { label: "66-80", value: "66-80" },
  { label: "81+", value: "81-200" },
];

interface FiltersProps {
  medicalIssue: string;
  age: string;
  onMedicalIssueChange: (value: string) => void;
  onAgeChange: (value: string) => void;
}

export default function Filters({
  medicalIssue,
  age,
  onMedicalIssueChange,
  onAgeChange,
}: FiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <select
          value={medicalIssue || "all"}
          onChange={(e) =>
            onMedicalIssueChange(e.target.value === "all" ? "" : e.target.value)
          }
          className="h-9 appearance-none rounded-lg border border-gray-300 bg-white pl-3 pr-8 text-sm text-gray-700 capitalize focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="all">All Issues</option>
          {MEDICAL_ISSUES.map((issue) => (
            <option key={issue} value={issue} className="capitalize">
              {issue}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="relative">
        <select
          value={age || "all"}
          onChange={(e) =>
            onAgeChange(e.target.value === "all" ? "" : e.target.value)
          }
          className="h-9 appearance-none rounded-lg border border-gray-300 bg-white pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {AGE_RANGES.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
