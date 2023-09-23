import React from 'react';
import classNames from 'classnames';

import styles from './Pagination.module.scss';
import ArrowRightIcon from '../icons/ArrowRightIcon/ArrowRightIcon';

export interface Props {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ page, totalPages, handlePagination }) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.paginationWrapper}>
        <button
          onClick={() => handlePagination(page - 1)}
          disabled={page === 1}
          type="button"
          className={classNames([styles.pageItem, styles.sides].join(' '))}
        >
          <ArrowRightIcon left color={page == 1 ? 'secondary' : 'primary'} />
        </button>
        <button
          onClick={() => handlePagination(1)}
          type="button"
          className={classNames(styles.pageItem, {
            [styles.active]: page === 1,
          })}
        >
          {1}
        </button>
        {page > 3 && <div className={styles.separator}>...</div>}
        {page === totalPages && totalPages > 3 && (
          <button onClick={() => handlePagination(page - 2)} type="button" className={styles.pageItem}>
            {page - 2}
          </button>
        )}
        {page > 2 && (
          <button onClick={() => handlePagination(page - 1)} type="button" className={styles.pageItem}>
            {page - 1}
          </button>
        )}
        {page !== 1 && page !== totalPages && (
          <button
            onClick={() => handlePagination(page)}
            type="button"
            className={[styles.pageItem, styles.active].join(' ')}
          >
            {page}
          </button>
        )}
        {page < totalPages - 1 && (
          <button onClick={() => handlePagination(page + 1)} type="button" className={styles.pageItem}>
            {page + 1}
          </button>
        )}
        {page === 1 && totalPages > 3 && (
          <button onClick={() => handlePagination(page + 2)} type="button" className={styles.pageItem}>
            {page + 2}
          </button>
        )}
        {page < totalPages - 2 && <div className={styles.separator}>...</div>}
        <button
          onClick={() => handlePagination(totalPages)}
          type="button"
          className={classNames(styles.pageItem, {
            [styles.active]: page === totalPages,
          })}
        >
          {totalPages}
        </button>
        <button
          onClick={() => handlePagination(page + 1)}
          disabled={page === totalPages}
          type="button"
          className={[styles.pageItem, styles.sides].join(' ')}
        >
          <ArrowRightIcon color={page == totalPages ? 'secondary' : 'primary'} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
