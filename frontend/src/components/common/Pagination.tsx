import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const maxVisiblePages = 7;
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const start = Math.max(1, Math.min(currentPage - 3, totalPages - 6));
    return Array.from({ length: maxVisiblePages }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`p-2 rounded-full transition-colors ${
          currentPage <= 1
            ? "text-gray-600 cursor-not-allowed"
            : "text-white hover:bg-white/10"
        }`}
      >
        <MdChevronLeft size={24} />
      </button>

      <div className="flex items-center gap-2">
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-8 h-8 rounded-full text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="px-1 text-sm text-gray-500">...</span>
            )}
          </>
        )}

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
              currentPage === page
                ? "bg-[var(--color-lime)] text-[#07101a]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {page}
          </button>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-1 text-sm text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-8 h-8 rounded-full text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`p-2 rounded-full transition-colors ${
          currentPage >= totalPages
            ? "text-gray-600 cursor-not-allowed"
            : "text-white hover:bg-white/10"
        }`}
      >
        <MdChevronRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;
