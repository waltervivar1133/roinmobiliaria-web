"use client";

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
      <h2 className="text-lg font-medium mb-4 text-primary-blue">
        Descripción
      </h2>

      {description && (
        <div
          className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-p:text-gray-600 prose-a:text-primary-blue prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </section>
  );
}
