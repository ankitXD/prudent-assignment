"use client";

import { Patient } from "@/lib/types";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  ClipboardPlus,
  Download,
  Droplets,
  FileText,
  Gauge,
  Pill,
  ShieldAlert,
  Stethoscope,
  User,
  VenusAndMars,
} from "lucide-react";

interface PatientProfileProps {
  patient: Patient;
  onBack: () => void;
}

function getProfileData(patient: Patient) {
  const contact = patient.contact[0];
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const pcps = [
    "Dr. Sarah Smith",
    "Dr. Michael Lee",
    "Dr. Emily Carter",
    "Dr. James Wilson",
    "Dr. Olivia Brown",
  ];
  const medications = [
    ["Lisinopril", "20mg Oral Tablet, Daily", "Rx #45192"],
    ["Vitamin D3", "2000 IU, Once Daily", "OTC"],
    ["Zyrtec", "10mg As Needed", "OTC"],
    ["Ibuprofen", "400mg As Needed", "OTC"],
    ["Amoxicillin", "500mg, Twice Daily", "Rx #22418"],
  ] as const;

  const gender = patient.patient_id % 2 === 0 ? "Female" : "Male";
  const bloodType = bloodTypes[patient.patient_id % bloodTypes.length];
  const pcp = pcps[patient.patient_id % pcps.length];
  const heartRate = 64 + (patient.patient_id % 18);
  const systolic = 108 + (patient.patient_id % 22);
  const diastolic = 68 + (patient.patient_id % 14);
  const temperature = (97.8 + (patient.patient_id % 9) * 0.2).toFixed(1);
  const oxygen = 96 + (patient.patient_id % 4);
  const noteDelta = patient.patient_id % 2 === 0 ? "Normal Range" : "Stable";

  const alerts = [
    {
      title: `Clinical Focus: ${patient.medical_issue}`,
      body: `Monitor symptoms related to ${patient.medical_issue} and follow up if condition persists.`,
      tone: "red",
    },
    {
      title: `Care Review: ${contact?.email ? "Communication on file" : "Missing contact detail"}`,
      body: contact?.email
        ? "Patient contact details verified for follow-up communication."
        : "Primary email is unavailable and should be verified at next visit.",
      tone: "amber",
    },
  ] as const;

  const activeConditions = [
    patient.medical_issue,
    patient.age > 60 ? "Senior Care Monitoring" : "Routine Wellness Review",
    contact?.email ? "Verified Contact Information" : "Contact Info Follow-up",
  ];

  const timeline = [
    {
      date: "Oct 24, 2023",
      title: "Annual Physical Examination",
      body: `${patient.patient_name} completed a routine physical review with ${pcp}.`,
      icon: CalendarDays,
      tone: "blue",
    },
    {
      date: "Oct 18, 2023",
      title: "Blood Work Results Released",
      body: `Lab results were updated and linked to ongoing care related to ${patient.medical_issue}.`,
      icon: ClipboardPlus,
      tone: "green",
    },
    {
      date: "Oct 12, 2023",
      title: "Medication Adjustment",
      body: `Care plan reviewed based on age ${patient.age} and current symptoms.`,
      icon: Pill,
      tone: "amber",
    },
  ] as const;

  return {
    contact,
    gender,
    bloodType,
    pcp,
    heartRate,
    systolic,
    diastolic,
    temperature,
    oxygen,
    noteDelta,
    alerts,
    activeConditions,
    currentMedications: [
      medications[patient.patient_id % medications.length],
      medications[(patient.patient_id + 1) % medications.length],
      medications[(patient.patient_id + 2) % medications.length],
    ],
    timeline,
  };
}

export default function PatientProfile({
  patient,
  onBack,
}: PatientProfileProps) {
  const profile = getProfileData(patient);

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Directory
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-colors hover:bg-blue-700">
          <Download className="h-4 w-4" />
          Download Profile
        </button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d9edf5]">
            {patient.photo_url ? (
              <img
                src={patient.photo_url}
                alt={patient.patient_name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.innerHTML =
                    `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
                }}
              />
            ) : (
              <User className="h-7 w-7 text-gray-400" />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold text-gray-900">
                {patient.patient_name}
              </h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Active Patient
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-8 text-sm text-slate-500">
              <div className="inline-flex items-center gap-2">
                <VenusAndMars className="h-4 w-4 text-blue-500" />
                {profile.gender}, {patient.age} years old
              </div>
              <div className="inline-flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                Blood Type: {profile.bloodType}
              </div>
              <div className="inline-flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-blue-500" />
                PCP: {profile.pcp}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-10">
          <section className="space-y-4">
            <h3 className="inline-flex items-center gap-2 text-[28px] font-bold text-slate-900 md:text-2xl">
              <Activity className="h-5 w-5 text-blue-600" />
              Vitals & Clinical Performance
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Heart Rate
                </p>
                <p className="mt-2 text-4xl font-bold text-slate-900">
                  {profile.heartRate}
                  <span className="ml-1 text-sm font-semibold text-slate-400">
                    bpm
                  </span>
                </p>
                <p className="mt-3 text-xs font-medium text-rose-500">
                  ~ 2% from avg
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  BP
                </p>
                <p className="mt-2 text-4xl font-bold text-slate-900">
                  {profile.systolic}/{profile.diastolic}
                </p>
                <p className="mt-1 text-sm text-slate-400">mmHg</p>
                <p className="mt-3 text-xs font-medium text-emerald-500">
                  ↗ Normal Range
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Temp
                </p>
                <p className="mt-2 text-4xl font-bold text-slate-900">
                  {profile.temperature}
                  <span className="ml-1 text-sm font-semibold text-slate-400">
                    °F
                  </span>
                </p>
                <p className="mt-3 text-xs font-medium text-rose-500">
                  ↘ 0.5% dec
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  O2 Level
                </p>
                <p className="mt-2 text-4xl font-bold text-slate-900">
                  {profile.oxygen}
                  <span className="ml-1 text-sm font-semibold text-slate-400">
                    %
                  </span>
                </p>
                <p className="mt-3 text-xs font-medium text-slate-400">
                  — {profile.noteDelta}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h3 className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900">
              <Gauge className="h-5 w-5 text-blue-600" />
              Recent Activity Timeline
            </h3>
            <div className="space-y-6">
              {profile.timeline.map((item, index) => {
                const Icon = item.icon;
                const toneClass =
                  item.tone === "green"
                    ? "bg-emerald-100 text-emerald-600"
                    : item.tone === "amber"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-blue-100 text-blue-600";

                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${toneClass}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      {index < profile.timeline.length - 1 && (
                        <div className="mt-2 h-12 w-px bg-slate-200" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {item.date}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 max-w-2xl text-sm text-slate-500">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h3 className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
              Clinical Alerts
            </h3>
            <div className="space-y-3">
              {profile.alerts.map((alert) => (
                <div
                  key={alert.title}
                  className={`rounded-xl border px-4 py-3 ${
                    alert.tone === "red"
                      ? "border-rose-200 bg-rose-50"
                      : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <ShieldAlert
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        alert.tone === "red"
                          ? "text-rose-500"
                          : "text-amber-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {alert.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {alert.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900">
              <FileText className="h-5 w-5 text-blue-600" />
              Medical Summary
            </h3>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
              <div className="border-b border-slate-100 pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Active Conditions
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {profile.activeConditions.map((condition) => (
                    <li key={condition} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span className="capitalize">{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Current Medications
                </p>
                <div className="mt-4 space-y-4">
                  {profile.currentMedications.map(([name, dose, label]) => (
                    <div
                      key={name}
                      className="flex items-start justify-between gap-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">{dose}</p>
                      </div>
                      <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold text-blue-600">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
