import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './limit.module.css';
import ILimitProps from '../../model/Limit';

const Limit: React.FC<ILimitProps> = ({
  limit,
  onLimitChange,
}): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    searchParams.set('limit', newLimit.toString());
    setSearchParams(searchParams);
    onLimitChange(newLimit);
  };

  return (
    <div className={styles.limit}>
      <label htmlFor="limit-select">Items per page:</label>
      <select
        className={styles.limit__select}
        id="limit-select"
        value={limit}
        onChange={handleLimitChange}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};

export default Limit;
