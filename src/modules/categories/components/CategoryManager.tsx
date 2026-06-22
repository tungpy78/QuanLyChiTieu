import React, { useState } from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';

export const CategoryManager: React.FC = () => {
  const { categories, addCategory, deleteCategory, isCategoryInUse } = useCategories();
  const [newCatName, setNewCatName] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = addCategory(newCatName);
    if (!res.success) {
      setError(res.error || 'Có lỗi xảy ra.');
    } else {
      setNewCatName('');
    }
  };

  const handleDeleteCategory = (id: string) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa danh mục này không?');
    if (!confirmed) {
      return;
    }

    const res = deleteCategory(id);
    if (!res.success) {
      alert(res.error || 'Không thể xóa danh mục.');
    }
  };

  return (
    <div className="category-manager">
      {/* Form thêm danh mục mới */}
      <form onSubmit={handleAddCategory} className="add-category-form">
        <div className="add-cat-input-wrapper">
          <Input
            label="Tên danh mục mới"
            value={newCatName}
            onChange={(e) => {
              setNewCatName(e.target.value);
              setError('');
            }}
            placeholder="Nhập danh mục (Ví dụ: Du lịch, Học tập...)"
            error={error}
          />
        </div>
        <Button type="submit" variant="primary" className="btn-add-cat">
          Thêm
        </Button>
      </form>

      {/* Danh sách danh mục */}
      <div className="category-list-container">
        <h4 className="category-list-title">Danh sách danh mục hiện có ({categories.length})</h4>
        <div className="category-list">
          {categories.map((cat) => {
            const inUse = isCategoryInUse(cat.id);
            const canBeDeleted = !cat.isDefault && !inUse;

            return (
              <div key={cat.id} className="category-item">
                <div className="category-info">
                  <span className="category-name">{cat.name}</span>
                  <div className="category-badges">
                    {cat.isDefault && (
                      <span className="badge badge-default">Mặc định</span>
                    )}
                    {inUse && (
                      <span className="badge badge-in-use">Đang dùng</span>
                    )}
                  </div>
                </div>
                <div className="category-actions">
                  {canBeDeleted ? (
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeleteCategory(cat.id)}
                    >
                      Xóa
                    </Button>
                  ) : (
                    <span className="disabled-reason-text" title={cat.isDefault ? 'Danh mục mặc định không thể xóa' : 'Danh mục đang có giao dịch sử dụng'}>
                      {cat.isDefault ? 'Mặc định' : 'Đang dùng'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
