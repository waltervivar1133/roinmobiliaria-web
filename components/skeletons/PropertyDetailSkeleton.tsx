export default function PropertyDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 pb-32 lg:pb-8">
        {/* Image slider skeleton */}
        <div className="space-y-4 animate-pulse">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] bg-gray-200 rounded-lg" />
          <div className="flex gap-2 md:gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Property info skeleton */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left side */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-32" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>

          {/* Right side - Contact card skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm animate-pulse">
              <div className="mb-4">
                <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
                <div className="h-8 bg-gray-200 rounded w-32" />
              </div>
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 rounded-lg" />
                <div className="h-12 bg-gray-200 rounded-lg" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-40 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-48" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
