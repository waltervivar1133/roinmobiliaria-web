import type { PropertyDetails } from "@/types/property";

interface PropertyDescriptionProps {
  description?: string;
  shortDescription?: string;
}

export default function PropertyDescription({
  description,
  shortDescription,
}: PropertyDescriptionProps) {
  if (!description && !shortDescription) {
    return null;
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4 text-primary-blue">
        Descripción
      </h2>
      {shortDescription && (
        <p className="text-xl text-gray-700 mb-6 font-semibold">
          {shortDescription}
        </p>
      )}
      {description && (
        <div
          className="prose prose-lg max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </section>
  );
}
