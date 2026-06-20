# AI Agent Development Rules

Tài liệu này định nghĩa các quy tắc bắt buộc mà AI Agent phải tuân thủ trong suốt quá trình triển khai mã nguồn cho dự án Personal Expense Tracker.

## Quy tắc Code & Stack
- **Stack bắt buộc**: Sử dụng **React + Vite + TypeScript**.
- **Không sử dụng thư viện UI sẵn**: Không sử dụng Ant Design, MUI, Bootstrap, Tailwind CSS hoặc bất kỳ thư viện UI bên ngoài nào khác. Toàn bộ giao diện phải sử dụng CSS thuần (Vanilla CSS) tự viết.
- **TypeScript Strict Mode**:
  - Không sử dụng kiểu dữ liệu `any`.
  - Không sử dụng `as any` để ép kiểu bừa bãi.
  - Không sử dụng `@ts-ignore` để bỏ qua lỗi TypeScript.
  - Không dùng `eslint-disable` để bỏ qua các cảnh báo linter.

## Quy tắc Kiến trúc & State
- **Tách biệt Logic**: Không viết toàn bộ logic trong `App.tsx` hoặc `App.jsx`.
- **Chia nhỏ component rõ ràng**: Mỗi component chỉ chịu một trách nhiệm duy nhất (Single Responsibility Principle).
- **Custom Hooks**: Phải tách biệt các logic quản lý dữ liệu và state thành các custom hook sau:
  - `useLocalStorage`: Hook dùng để lưu/đọc/đồng bộ dữ liệu với localStorage.
  - `useTransactions`: Hook chứa các logic thêm/sửa/xóa/lọc/sắp xếp giao dịch.
  - `useCategories`: Hook chứa logic quản lý danh mục và ràng buộc xóa danh mục.
- **State Management**:
  - Phải dùng `useReducer` để quản lý các action thay đổi của `transactions` và `categories`.
  - Phải dùng `useContext` để chia sẻ state toàn cục (Global State) xuống các component con mà không bị prop drilling.
- **Ràng buộc dữ liệu & logic**:
  - Giá trị số tiền (`amount`) của giao dịch luôn luôn là số dương (`> 0`).
  - Không mutate (chỉnh sửa trực tiếp) state trong reducer. Phải tạo bản sao mới (immutable state).
  - Đọc ghi `localStorage` phải có khối lệnh `try/catch` để tránh lỗi parse JSON bị hỏng (corrupted data).
  - Toàn bộ Form nhập liệu phải có validation đầy đủ và chính xác trước khi cho phép submit.
  - Khi xóa danh mục: Nếu danh mục đang được sử dụng trong ít nhất một giao dịch, **phải chặn hoàn toàn** việc xóa danh mục đó.

## Quy tắc Kiểm thử & Kiểm soát
- **Không tự ý commit code**: Không tự động tạo commit git trừ khi có sự đồng ý hoặc chỉ dẫn trực tiếp từ người dùng.
- **Đảm bảo tính Build-safe**: Sau khi hoàn thành bất kỳ task code nào, phải chạy thử lệnh `npm run build` để kiểm tra lỗi TypeScript và quá trình build trước khi báo cáo kết quả.
