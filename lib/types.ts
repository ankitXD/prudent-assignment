export interface Patient {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: {
    address: string;
    number: string;
    email: string;
  }[];
  medical_issue: string;
}

export interface PatientsResponse {
  data: Patient[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
