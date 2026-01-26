"use client";

interface PropertyCharacteristicsProps {
  characteristics?: string | null;
}

export default function PropertyCharacteristics({
  characteristics,
}: PropertyCharacteristicsProps) {
  if (!characteristics) {
    return null;
  }

  return (
    <section>
      <h2 className="text-lg font-medium mb-6 text-primary-blue">
        Características Generales
      </h2>
      <div
        className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-p:text-gray-600 prose-a:text-primary-blue prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: characteristics }}
      />
    </section>
  );
}
