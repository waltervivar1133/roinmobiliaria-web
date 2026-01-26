export default function BlogListSkeleton() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
            >
              <div className="relative h-48 md:h-64 w-full bg-gray-200" />
              <div className="p-4 md:p-6">
                <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
                <div className="h-6 bg-gray-200 rounded w-full mb-2" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
                <div className="h-10 bg-gray-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
