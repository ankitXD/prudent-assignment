"use client";

import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="relative flex-1 max-w-lg">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />
      <input
        type="text"
        placeholder="Search"
        value={localValue}
        onChange={handleChange}
        className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-10 text-sm text-gray-700 placeholder:text-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
      <SlidersHorizontal className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
