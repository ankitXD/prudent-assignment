"use client";

import { Patient } from "@/lib/types";
import { User } from "lucide-react";

const ISSUE_COLORS: Record<string, string> = {
  fever: "bg-blue-100 text-blue-700 border-blue-200",
  headache: "bg-green-100 text-green-700 border-green-200",
  "sore throat": "bg-teal-100 text-teal-700 border-teal-200",
  "sprained ankle": "bg-amber-100 text-amber-700 border-amber-200",
  rash: "bg-pink-100 text-pink-700 border-pink-200",
  "ear infection": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "allergic reaction": "bg-orange-100 text-orange-700 border-orange-200",
  "broken arm": "bg-red-100 text-red-700 border-red-200",
  sinusitis: "bg-purple-100 text-purple-700 border-purple-200",
  "stomach ache": "bg-yellow-100 text-yellow-700 border-yellow-200",
};

function formatId(id: number): string {
  return `ID-${String(id).padStart(4, "0")}`;
}

interface PatientTableProps {
  patients: Patient[];
  onSelect?: (patient: Patient) => void;
}

export default function PatientTable({
  patients,
  onSelect,
}: PatientTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left font-medium text-blue-600">
              ID
            </th>
            <th className="px-4 py-3 text-left font-medium text-blue-600">
              Name
            </th>
            <th className="px-4 py-3 text-left font-medium text-blue-600">
              Age
            </th>
            <th className="px-4 py-3 text-left font-medium text-blue-600">
              Medical Issue
            </th>
            <th className="px-4 py-3 text-left font-medium text-blue-600">
              Address
            </th>
            <th className="px-4 py-3 text-left font-medium text-blue-600">
              Phone Number
            </th>
            <th className="px-4 py-3 text-left font-medium text-blue-600">
              Email ID
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => {
            const contact = patient.contact[0];
            const issueColor =
              ISSUE_COLORS[patient.medical_issue] ||
              "bg-gray-100 text-gray-700 border-gray-200";

            return (
              <tr
                key={patient.patient_id}
                onClick={() => onSelect?.(patient)}
                className="border-b border-gray-100 transition-colors hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-3.5 text-gray-500">
                  {formatId(patient.patient_id)}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                      {patient.photo_url ? (
                        <img
                          src={patient.photo_url}
                          alt={patient.patient_name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                            (
                              e.target as HTMLImageElement
                            ).parentElement!.innerHTML =
                              `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
                          }}
                        />
                      ) : (
                        <User className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <span className="font-medium text-gray-900">
                      {patient.patient_name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-gray-700">{patient.age}</td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${issueColor}`}
                  >
                    {patient.medical_issue}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-gray-600">
                  {contact?.address || (
                    <span className="text-red-500">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-gray-600">
                  {contact?.number || <span className="text-red-500">N/A</span>}
                </td>
                <td className="px-4 py-3.5 text-gray-600">
                  {contact?.email || <span className="text-red-500">N/A</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
