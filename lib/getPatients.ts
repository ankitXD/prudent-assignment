import { PatientsResponse } from "./types";

export async function getPatients(
  params: URLSearchParams,
): Promise<PatientsResponse> {
  const res = await fetch(`/api/patients?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch patients");
  }

  return res.json();
}
