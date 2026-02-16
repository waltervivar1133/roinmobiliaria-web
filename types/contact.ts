export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyInterest: string;
}

import type { Property } from "./property";

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface ContactFormProps {
  properties: Property[];
  onSubmit?: (data: ContactFormData) => void;
}