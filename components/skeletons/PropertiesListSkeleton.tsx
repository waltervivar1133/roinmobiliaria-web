export default function PropertiesListSkeleton() {
  return (
    <div className="bg-white">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mb-4" />
          <div className="h-5 bg-gray-200 rounded w-96 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-48" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex flex-col h-full border border-gray-200 bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
            >
              <div className="p-3 md:p-4">
                <div className="relative h-48 md:h-64 w-full bg-gray-200 rounded-lg" />
              </div>
              <div className="p-4 md:p-6 flex flex-col grow">
                <div className="h-5 bg-gray-200 rounded mb-2 w-3/4" />
                <div className="h-4 bg-gray-200 rounded mb-3 w-1/2" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
                  <div className="h-6 bg-gray-200 rounded w-24" />
                  <div className="h-5 bg-gray-200 rounded w-32" />
                </div>
                <div className="mt-auto">
                  <div className="w-full h-10 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
