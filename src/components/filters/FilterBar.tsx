import React from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useCategories } from '../../hooks/useCategories';
import { Button } from '../ui/Button';

export const FilterBar: React.FC = () => {
  const { filters, setFilters } = useTransactions();
  const { categories } = useCategories();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchText: e.target.value }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      type: e.target.value as 'all' | 'income' | 'expense',
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, categoryId: e.target.value }));
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, dateFrom: e.target.value }));
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, dateTo: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: e.target.value as 'newest' | 'oldest',
    }));
  };

  const handleReset = () => {
    setFilters({
      searchText: '',
      type: 'all',
      categoryId: '',
      dateFrom: '',
      dateTo: '',
      sortOrder: 'newest',
    });
  };

  const isDateRangeInvalid =
    filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo;

  return (
    <div className="filter-bar-container">
      <h3 className="section-title">Bộ lọc & Tìm kiếm</h3>
      <div className="filter-bar">
        {/* Tìm kiếm */}
        <div className="filter-item search-input-group">
          <label htmlFor="filter-search" className="filter-label">Tìm kiếm</label>
          <input
            id="filter-search"
            type="text"
            className="form-control"
            placeholder="Tìm theo tên giao dịch..."
            value={filters.searchText}
            onChange={handleSearchChange}
          />
        </div>

        {/* Loại */}
        <div className="filter-item">
          <label htmlFor="filter-type" className="filter-label">Loại</label>
          <select
            id="filter-type"
            className="form-control"
            value={filters.type}
            onChange={handleTypeChange}
          >
            <option value="all">Tất cả</option>
            <option value="income">Thu nhập</option>
            <option value="expense">Chi tiêu</option>
          </select>
        </div>

        {/* Danh mục */}
        <div className="filter-item">
          <label htmlFor="filter-category" className="filter-label">Danh mục</label>
          <select
            id="filter-category"
            className="form-control"
            value={filters.categoryId}
            onChange={handleCategoryChange}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Từ ngày */}
        <div className="filter-item">
          <label htmlFor="filter-date-from" className="filter-label">Từ ngày</label>
          <input
            id="filter-date-from"
            type="date"
            className={`form-control ${isDateRangeInvalid ? 'border-warning' : ''}`}
            value={filters.dateFrom}
            onChange={handleDateFromChange}
          />
        </div>

        {/* Đến ngày */}
        <div className="filter-item">
          <label htmlFor="filter-date-to" className="filter-label">Đến ngày</label>
          <input
            id="filter-date-to"
            type="date"
            className={`form-control ${isDateRangeInvalid ? 'border-warning' : ''}`}
            value={filters.dateTo}
            onChange={handleDateToChange}
          />
        </div>

        {/* Sắp xếp */}
        <div className="filter-item">
          <label htmlFor="filter-sort" className="filter-label">Sắp xếp</label>
          <select
            id="filter-sort"
            className="form-control"
            value={filters.sortOrder}
            onChange={handleSortChange}
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </div>

        {/* Action reset */}
        <div className="filter-item filter-actions-item">
          <Button variant="secondary" onClick={handleReset} className="btn-reset">
            Xóa bộ lọc
          </Button>
        </div>
      </div>

      {isDateRangeInvalid && (
        <div className="filter-warning-text" role="alert">
          ⚠️ Ngày bắt đầu không thể lớn hơn ngày kết thúc.
        </div>
      )}
    </div>
  );
};
