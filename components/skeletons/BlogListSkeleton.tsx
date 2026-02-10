export default function BlogListSkeleton() {
  return (
    <div className="bg-white">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mb-6" />
          {/* Search + filters */}
          <div className="hidden md:flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-9 w-20 md:w-24 bg-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          <div className="lg:col-span-2 animate-pulse">
            <div className="relative h-[300px] md:min-h-[400px] rounded-xl overflow-hidden bg-gray-200" />
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-full" />
            </div>
          </div>

          <div className="space-y-4 lg:col-span-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row rounded-xl overflow-hidden border border-gray-200 bg-white shadow-md animate-pulse"
              >
                <div className="w-full h-48 md:w-48 md:h-[160px] shrink-0 bg-gray-200" />
                <div className="flex-1 p-4 flex flex-col justify-center">
                  <div className="h-3 bg-gray-200 rounded w-28 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-4/5 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="mb-16">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row rounded-xl overflow-hidden border border-gray-200 bg-white shadow-md animate-pulse"
              >
                <div className="w-full h-48 md:w-48 md:h-[160px] shrink-0 bg-gray-200" />
                <div className="flex-1 p-4 flex flex-col justify-center">
                  <div className="h-3 bg-gray-200 rounded w-28 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="h-6 bg-gray-200 rounded w-44 animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
              >
                <div className="h-40 md:h-48 w-full bg-gray-200" />
                <div className="p-4 md:p-6">
                  <div className="h-3 bg-gray-200 rounded w-24 mb-3" />
                  <div className="h-5 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
