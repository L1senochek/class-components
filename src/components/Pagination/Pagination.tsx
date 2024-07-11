import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './pagination.module.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
}): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={currentPage === index + 1 ? styles.active : ''}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
