# Danh Sách Task Triển Khai (TASKS.md)

Tài liệu này theo dõi các giai đoạn triển khai dự án Personal Expense Tracker theo từng bước nhỏ được kiểm soát chặt chẽ.

---

## T0 - Khởi tạo project và tài liệu
- **Mục tiêu**: Tạo dự án React + Vite + TypeScript mới và thiết lập cấu trúc thư mục ban đầu cùng các file cấu hình.
- **File dự kiến tạo/sửa**:
  - `package.json`, `tsconfig.json` (tạo qua Vite)
  - `README.md`, `AGENTS.md`, `TASKS.md` (đã tạo)
- **Điều kiện hoàn thành**:
  - Khởi tạo thành công template `react-ts` qua Vite.
  - Chạy thử `npm install` thành công.
  - Khởi chạy server dev thành công.
- **Lệnh test cần chạy**:
  - `npm run dev` (mở browser để xác nhận trang mặc định của Vite chạy tốt).
  - `npm run build` (build không lỗi).

---

## T1 - Định nghĩa types, constants, utils
- **Mục tiêu**: Thiết lập hệ thống kiểu dữ liệu TypeScript, các danh mục mặc định và các hàm tiện ích định dạng tiền tệ, ngày tháng.
- **File dự kiến tạo/sửa**:
  - `src/types/index.ts`
  - `src/constants/index.ts`
  - `src/utils/formatCurrency.ts`
  - `src/utils/formatDate.ts`
- **Điều kiện hoàn thành**:
  - Định nghĩa đầy đủ `Transaction`, `Category`, `FilterState`, `UIState`.
  - Có các hàm format tiền tệ và ngày tháng hoạt động chính xác.
- **Lệnh test cần chạy**:
  - `npm run build` (đảm bảo code TS mới compile thành công, không lỗi cú pháp).

---

## T2 - Tạo useLocalStorage, reducers, AppContext
- **Mục tiêu**: Xây dựng nền tảng quản lý state toàn cục sử dụng Reducer và Context, tích hợp đồng bộ dữ liệu qua localStorage.
- **File dự kiến tạo/sửa**:
  - `src/hooks/useLocalStorage.ts`
  - `src/reducers/transactionReducer.ts`
  - `src/reducers/categoryReducer.ts`
  - `src/context/AppContext.tsx`
  - `src/hooks/useTransactions.ts`
  - `src/hooks/useCategories.ts`
- **Điều kiện hoàn thành**:
  - `useLocalStorage` xử lý ghi/đọc chính xác và có try/catch bảo vệ.
  - Các reducer thực hiện CRUD không mutate state trực tiếp.
  - State được truyền thành công qua `AppContextProvider`.
- **Lệnh test cần chạy**:
  - `npm run build` (kiểm tra type-checking cho các action reducer và context).

---

## T3 - Xây Dashboard
- **Mục tiêu**: Hiển thị tổng quan các số liệu tài chính quan trọng của người dùng.
- **File dự kiến tạo/sửa**:
  - `src/components/dashboard/SummaryCard.tsx`
  - `src/components/dashboard/Dashboard.tsx`
- **Điều kiện hoàn thành**:
  - Tính toán chính xác: Tổng Thu, Tổng Chi, Số Dư Hiện Tại (= Thu - Chi), Số Lượng Giao Dịch.
  - Hiển thị đúng định dạng tiền tệ (VD: "1,500,000 đ").
- **Lệnh test cần chạy**:
  - `npm run build`

---

## T4 - Xây TransactionForm thêm/sửa với validation
- **Mục tiêu**: Tạo form nhập liệu giao dịch dùng chung cho cả chức năng Thêm và Sửa, có kiểm tra tính hợp lệ của dữ liệu đầu vào.
- **File dự kiến tạo/sửa**:
  - `src/components/ui/Input.tsx`
  - `src/components/transactions/TransactionForm.tsx`
- **Điều kiện hoàn thành**:
  - Form hoạt động ở cả 2 chế độ: Thêm mới (form trống) và Sửa (pre-fill data của giao dịch cần sửa).
  - Validation hoạt động chính xác:
    - Tên giao dịch không bỏ trống.
    - Số tiền phải là số lớn hơn 0.
    - Phải chọn loại giao dịch (Thu / Chi).
    - Phải chọn ngày giao dịch.
  - Không cho phép submit form nếu validation thất bại, hiển thị thông báo lỗi rõ ràng bên dưới mỗi input.
- **Lệnh test cần chạy**:
  - `npm run build`

---

## T5 - Xây TransactionList, TransactionItem, edit/delete
- **Mục tiêu**: Hiển thị danh sách các giao dịch và cung cấp các nút tương tác để Sửa hoặc Xóa.
- **File dự kiến tạo/sửa**:
  - `src/components/transactions/TransactionItem.tsx`
  - `src/components/transactions/TransactionList.tsx`
- **Điều kiện hoàn thành**:
  - Hiển thị đầy đủ thông tin: tên, loại (Thu/Chi - phân biệt bằng màu sắc), số tiền, danh mục (tên danh mục tương ứng), ngày, ghi chú.
  - Nút "Sửa" mở form với đúng dữ liệu của dòng đó.
  - Nút "Xóa" hiển thị hộp thoại xác nhận trước khi thực hiện xóa khỏi state.
- **Lệnh test cần chạy**:
  - `npm run build`

---

## T6 - Xây FilterBar search/filter/sort
- **Mục tiêu**: Cung cấp bộ công cụ lọc và tìm kiếm giao dịch đa năng.
- **File dự kiến tạo/sửa**:
  - `src/components/filters/FilterBar.tsx`
  - `src/utils/filterTransactions.ts`
- **Điều kiện hoàn thành**:
  - Lọc theo tên giao dịch (tìm kiếm tương đối, không phân biệt hoa thường).
  - Lọc theo loại (Tất cả / Thu / Chi).
  - Lọc theo danh mục đã chọn.
  - Lọc theo khoảng ngày (từ ngày... đến ngày...).
  - Sắp xếp theo ngày mới nhất hoặc cũ nhất.
  - Sử dụng logic tối ưu để lọc trên client.
- **Lệnh test cần chạy**:
  - `npm run build`

---

## T7 - Xây CategoryManager
- **Mục tiêu**: Cho phép người dùng quản lý các danh mục chi tiêu của mình.
- **File dự kiến tạo/sửa**:
  - `src/components/categories/CategoryManager.tsx`
- **Điều kiện hoàn thành**:
  - Hiển thị danh sách các danh mục hiện tại.
  - Cho phép thêm danh mục mới.
  - Chặn việc xóa danh mục nếu:
    - Danh mục là danh mục mặc định (`isDefault: true`).
    - Danh mục đang được dùng trong ít nhất một giao dịch hiện tại (kiểm tra thông qua logic hook).
- **Lệnh test cần chạy**:
  - `npm run build`

---

## T8 - CSS polish, responsive, final test
- **Mục tiêu**: Làm đẹp giao diện với Vanilla CSS, hoàn thiện responsive trên các thiết bị và kiểm thử toàn bộ ứng dụng.
- **File dự kiến tạo/sửa**:
  - `src/index.css`
  - Các file CSS component tương ứng (nếu có).
- **Điều kiện hoàn thành**:
  - Giao diện đẹp mắt, sạch sẽ, trực quan theo chuẩn Light Mode.
  - Layout hiển thị tốt trên cả Mobile, Tablet và Desktop.
  - Không có lỗi console hay crash ứng dụng khi thao tác các tác vụ liên tục.
- **Lệnh test cần chạy**:
  - `npm run build` (kiểm tra khâu đóng gói cuối cùng).
