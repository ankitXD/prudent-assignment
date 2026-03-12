"use client";

import { Patient } from "@/lib/types";
import { Mail, MapPin, Phone, User } from "lucide-react";

const ISSUE_COLORS: Record<string, string> = {
  fever: "bg-blue-100 text-blue-700",
  headache: "bg-green-100 text-green-700",
  "sore throat": "bg-teal-100 text-teal-700",
  "sprained ankle": "bg-amber-100 text-amber-700",
  rash: "bg-pink-100 text-pink-700",
  "ear infection": "bg-emerald-100 text-emerald-700",
  "allergic reaction": "bg-orange-100 text-orange-700",
  "broken arm": "bg-red-100 text-red-700",
  sinusitis: "bg-purple-100 text-purple-700",
  "stomach ache": "bg-yellow-100 text-yellow-700",
};

interface PatientCardProps {
  patient: Patient;
  onSelect?: (patient: Patient) => void;
}

export default function PatientCard({ patient, onSelect }: PatientCardProps) {
  const contact = patient.contact[0];
  const issueColor =
    ISSUE_COLORS[patient.medical_issue] || "bg-gray-100 text-gray-700";
  const patientId = `ID-${String(patient.patient_id).padStart(4, "0")}`;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(patient)}
      className="w-full cursor-pointer overflow-hidden rounded-xl border border-[#d6dde8] bg-white text-left shadow-[0_4px_14px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_8px_22px_rgba(15,23,42,0.12)] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
    >
      <div className="flex items-start justify-between gap-3 bg-[#dfeafb] px-3.5 py-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
            {patient.photo_url ? (
              <img
                src={patient.photo_url}
                alt={patient.patient_name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.innerHTML =
                    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
                }}
              />
            ) : (
              <User className="h-4 w-4 text-gray-400" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-[13px] font-semibold leading-4 text-[#1f2937]">
              {patient.patient_name}
            </h3>
            <p className="mt-1 text-[10px] font-medium tracking-wide text-[#64748b]">
              {patientId}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-[#3b82f6] px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
          Age:{patient.age}
        </span>
      </div>

      <div className="space-y-3 px-3.5 py-3.5">
        <span
          className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[11px] font-semibold capitalize ${issueColor}`}
        >
          {patient.medical_issue}
        </span>

        <div className="space-y-2.5 text-[12px] text-[#1f2937]">
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6b7280]" />
            <span className="line-clamp-1">
              {contact?.address || <span className="text-red-500">N/A</span>}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6b7280]" />
            <span>
              {contact?.number || <span className="text-red-500">N/A</span>}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6b7280]" />
            <span className="line-clamp-1">
              {contact?.email || <span className="text-red-500">N/A</span>}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
