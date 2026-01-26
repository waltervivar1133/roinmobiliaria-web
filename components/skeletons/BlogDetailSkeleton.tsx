export default function BlogDetailSkeleton() {
  return (
    <div className="bg-white animate-pulse">
      {/* Header skeleton */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-8 bg-gray-200 rounded w-full mb-2" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
        </div>
      </div>

      {/* Featured Image skeleton */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200" />

      {/* Content skeleton */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-6 bg-gray-200 rounded w-2/3 my-6" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
        </div>
      </article>

      {/* Related Posts skeleton */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-48 w-full bg-gray-200" />
                <div className="p-4 md:p-6">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
                  <div className="h-5 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
