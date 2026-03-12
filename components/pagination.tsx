"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function padPage(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    // Show up to 7 pages around the current one
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, page - 3);
      const end = Math.min(totalPages, start + maxVisible - 1);
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }
      for (let i = start; i <= end; i++) pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      {getPageNumbers().map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm transition-colors ${
            p === page
              ? "bg-blue-600 font-medium text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {p === page ? padPage(p) : padPage(p)}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
