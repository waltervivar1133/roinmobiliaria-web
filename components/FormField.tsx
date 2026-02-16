import React from "react";

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  rows?: number;
  className?: string;
}

export default function FormField({
  label,
  id,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder,
  error,
  rows,
  className = "",
}: FormFieldProps) {
  const baseInputClasses = "w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all outline-none";
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "";
  const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`;

  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm md:text-base font-semibold text-gray-700 mb-2"
      >
        {label} {required && "*"}
      </label>
      <InputComponent
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={inputClasses}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}