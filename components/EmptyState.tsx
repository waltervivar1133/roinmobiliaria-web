interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title = "Sin resultados",
  description = "No hay elementos disponibles en este momento.",
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 md:px-8 ${className}`}>
      <div className="text-center py-12">
        {icon && <div className="mb-4">{icon}</div>}
        <h3 className="text-gray-800 text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
