"use client";

import { Patient } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, User } from "lucide-react";

interface PatientRowProps {
  patient: Patient;
}

export default function PatientRow({ patient }: PatientRowProps) {
  const contact = patient.contact[0];

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-shadow hover:shadow-sm">
      {/* Avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
        {patient.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={patient.photo_url}
            alt={patient.patient_name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).parentElement!.innerHTML =
                `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
            }}
          />
        ) : (
          <User className="h-5 w-5 text-muted-foreground" />
        )}
      </div>

      {/* Name + Age */}
      <div className="min-w-35">
        <p className="font-medium text-sm leading-tight">
          {patient.patient_name}
        </p>
        <p className="text-xs text-muted-foreground">Age: {patient.age}</p>
      </div>

      {/* Medical Issue */}
      <div className="min-w-25">
        <Badge variant="secondary" className="capitalize">
          {patient.medical_issue}
        </Badge>
      </div>

      {/* Contact */}
      {contact && (
        <div className="hidden md:flex flex-1 items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{contact.number}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{contact.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate max-w-50">{contact.address}</span>
          </div>
        </div>
      )}
    </div>
  );
}
