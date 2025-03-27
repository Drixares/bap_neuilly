"use client";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  totalItems, 
  itemsPerPage, 
  currentPage,
  onPageChange 
}: PaginationProps) {
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range of pages to show around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('ellipsis1');
    }
    
    // Add page numbers between first and last
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('ellipsis2');
    }
    
    // Add last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 py-8 bg-[var(--beige)]">
      {/* Previous button */}
      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center justify-center rounded-md ${
          currentPage === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-200'
        }`}
        aria-label="Previous page"
      >
        &lt;
      </button>
      
      {/* Page numbers */}
      {pageNumbers.map((page, index) => {
        if (page === 'ellipsis1' || page === 'ellipsis2') {
          return (
            <span key={`${page}-${index}`} className="w-8 h-8 flex items-center justify-center">
              ...
            </span>
          );
        }
        
        return (
          <button
            key={`page-${page}`}
            onClick={() => handlePageChange(Number(page))}
            className={`w-8 h-8 flex items-center justify-center rounded-md ${
              currentPage === page
                ? 'bg-[#C4742C] text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        );
      })}
      
      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center rounded-md ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  );
}