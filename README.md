# Personal Expense Tracker

## Mục tiêu
Dự án Personal Expense Tracker được xây dựng nhằm mục đích học tập và thực hành xây dựng một ứng dụng Single Page Application (SPA) để quản lý thu/chi cá nhân sử dụng React + Vite + TypeScript.

## Chức năng chính
- **Dashboard**: Hiển thị tổng thu, tổng chi, số dư hiện tại và số lượng giao dịch.
- **Thêm/sửa/xóa giao dịch**: Cho phép thực hiện đầy đủ các thao tác CRUD trên giao dịch với form validation chặt chẽ.
- **Tìm kiếm, lọc, sắp xếp**: Tìm kiếm giao dịch theo tên, lọc theo loại (Thu/Chi), lọc theo danh mục, lọc theo khoảng ngày, và sắp xếp theo ngày mới nhất/cũ nhất.
- **Quản lý danh mục**: Cho phép xem danh sách danh mục (có các danh mục mặc định), thêm danh mục mới, và xóa danh mục (chỉ khi danh mục chưa được sử dụng trong giao dịch nào).
- **Lưu dữ liệu**: Sử dụng `localStorage` để lưu trữ dữ liệu bền vững, reload trang không mất dữ liệu.

## Công nghệ sử dụng
- **React** (với Functional Components và Hooks)
- **Vite** (công cụ build cực nhanh)
- **TypeScript** (đảm bảo tính an toàn dữ liệu và autocomplete tốt hơn)
- **Vanilla CSS** tự viết (không dùng thư viện UI sẵn có hay Tailwind)

## Cách chạy project
1. **Cài đặt thư viện**:
   ```bash
   npm install
   ```
2. **Chạy môi trường phát triển (development)**:
   ```bash
   npm run dev
   ```
3. **Build production bundle**:
   ```bash
   npm run build
   ```
