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
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
              currentPage === page
                ? "bg-[var(--color-purple)] text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {page}
          </button>
        ))}
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
