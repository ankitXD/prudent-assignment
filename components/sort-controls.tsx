"use client";

import { ArrowUpDown } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Name (A-Z)", value: "patient_name-asc" },
  { label: "Name (Z-A)", value: "patient_name-desc" },
  { label: "Age (Ascending)", value: "age-asc" },
  { label: "Age (Descending)", value: "age-desc" },
];

interface SortControlsProps {
  value: string;
  onChange: (sort: string, order: string) => void;
}

export default function SortControls({ value, onChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
        Sort by:
      </span>
      <div className="relative">
        <select
          value={value || "default"}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "default") {
              onChange("", "");
            } else {
              const [sort, order] = v.split("-");
              onChange(sort, order);
            }
          }}
          className="h-9 appearance-none rounded-lg border border-gray-300 bg-white pl-3 pr-8 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
