"use client";

import { useState } from "react";
import type { ContactFormData, ContactFormErrors } from "@/types/contact";
import { sendWhatsAppMessage } from "@/utils/whatsapp";

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyInterest: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const updatePropertyInterest = (propertyName: string) => {
    updateField("propertyInterest", propertyName);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!validateForm()) {
      return false;
    }

    sendWhatsAppMessage(formData);
    return true;
  };

  const reset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      propertyInterest: "",
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    updatePropertyInterest,
    handleSubmit,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
}
