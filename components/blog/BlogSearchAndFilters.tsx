"use client";

import { useState } from "react";
import type { BlogPost } from "@/types/blog";

interface BlogSearchAndFiltersProps {
  posts: BlogPost[];
  categories: string[];
  onFilterChange: (filteredPosts: BlogPost[]) => void;
}

export default function BlogSearchAndFilters({
  posts,
  categories,
  onFilterChange,
}: BlogSearchAndFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, selectedCategory);
  };

  const handleCategoryClick = (category: string | null) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    applyFilters(searchTerm, newCategory);
  };

  const applyFilters = (search: string, category: string | null) => {
    let filtered = [...posts];

    // Filter by category
    if (category) {
      filtered = filtered.filter((post) =>
        post.categories?.nodes.some((cat) => cat.name === category)
      );
    }

    // Filter by search term
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower)
      );
    }

    onFilterChange(filtered);
  };

  return (
    <>
      {/* Search Bar - Desktop */}
      <div className="hidden md:flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Nombre del artículo"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
        </div>
        <button
          onClick={() => handleSearch(searchTerm)}
          className="px-6 py-2 bg-primary-green text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          Buscar
        </button>
      </div>

      {/* Search Button - Mobile */}
      <div className="md:hidden flex gap-3 mb-4">
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-primary-blue font-semibold hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span>{searchTerm || "Buscar artículo"}</span>
        </button>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-primary-blue font-semibold hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          {selectedCategory && (
            <span className="px-2 py-0.5 bg-primary-blue text-white text-xs rounded-full">
              1
            </span>
          )}
        </button>
      </div>

      {/* Category Filters - Desktop visible, Mobile in modal */}
      <div className="hidden md:flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            selectedCategory === null
              ? "bg-primary-blue text-white shadow-md"
              : "text-primary-blue bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100"
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              selectedCategory === category
                ? "bg-primary-blue text-white shadow-md"
                : "text-primary-blue bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden animate-fade-in"
            onClick={() => setIsSearchModalOpen(false)}
          />
          {/* Modal */}
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl z-50 md:hidden animate-slide-up">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-primary-blue">Buscar</h3>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="p-2 text-gray-600 hover:text-primary-blue transition-colors"
                  aria-label="Cerrar búsqueda"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Search Input */}
              <div className="relative mb-4">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Nombre del artículo"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsSearchModalOpen(false);
                    }
                  }}
                  autoFocus
                  className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={() => {
                  handleSearch(searchTerm);
                  setIsSearchModalOpen(false);
                }}
                className="w-full px-6 py-3 bg-primary-green text-white font-semibold rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors"
              >
                Buscar
              </button>

              {/* Clear Search Button */}
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    handleSearch("");
                    setIsSearchModalOpen(false);
                  }}
                  className="mt-3 w-full px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden animate-fade-in"
            onClick={() => setIsFilterModalOpen(false)}
          />
          {/* Modal */}
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl z-50 md:hidden animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-primary-blue">Filtros</h3>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-2 text-gray-600 hover:text-primary-blue transition-colors"
                  aria-label="Cerrar filtros"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Category Filters */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Categorías
                </p>
                <button
                  onClick={() => {
                    handleCategoryClick(null);
                    setIsFilterModalOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left font-semibold rounded-lg transition-all ${
                    selectedCategory === null
                      ? "bg-primary-blue text-white"
                      : "text-primary-blue bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  Todos
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryClick(category);
                      setIsFilterModalOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left font-semibold rounded-lg transition-all ${
                      selectedCategory === category
                        ? "bg-primary-blue text-white"
                        : "text-primary-blue bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Clear Filter Button */}
              {selectedCategory && (
                <button
                  onClick={() => {
                    handleCategoryClick(null);
                    setIsFilterModalOpen(false);
                  }}
                  className="mt-6 w-full px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
