# Cấu trúc lại TSD thành nhiều trang – Kế hoạch thực hiện

> Thực hiện: Native (Claude tự làm trong phiên, theo yêu cầu "mày làm đi" của người dùng).

**Mục tiêu:** chuyển trang TSD một file sang cấu trúc mỗi mục một trang, giao diện theo mes-process (bản sáng).
**Kiến trúc:** HTML tĩnh; `assets/js/menu.js` khai báo mục lục; `assets/js/layout.js` vẽ thanh bên/thanh trên/Trước-Sau cho mọi trang; nội dung mỗi mục ở `pages/NN-*.html`.
**Công nghệ:** HTML, CSS, JS thuần (ES5), không build.
**Spec:** `docs/specs/2026-10-16-tsd-restructure-design.md`

## Ràng buộc chung
- Đường dẫn tương đối; trang con dùng `<body data-root="../">`, `index.html` dùng `data-root=""`.
- Không fetch, không module; chạy qua file://, Netlify, GitHub Pages thư mục con.
- Token màu đúng bảng ở spec mục 6.

## Review Focus
1. Mở trang con qua file:// – link mục lục, ảnh, CSS phải đúng (kiểm tra bằng Playwright).
2. Đặt site trong thư mục con `/Dorco_WMS_Mockup/` – không link nào trỏ về `/`.
3. Màn hình 390px – không cuộn ngang, nút Menu mở/đóng được thanh bên.
4. Tìm kiếm gõ không dấu ("vi tri") vẫn ra "Danh mục vị trí".
5. Trước/Sau bỏ qua mục `soon` và ẩn khi không có trang kề.

## Task 1: CSS + JS dùng chung
Files: `assets/css/{tokens,base,layout,components,print}.css`, `assets/js/{menu,layout}.js`
- `window.TSD_MENU` (cấu trúc theo spec mục 4).
- `layout.js`: tự chạy khi DOMContentLoaded; đọc `document.body.dataset.root`, `dataset.page` (vd "1" hoặc "home"); dựng `.side`, `.top`, nút "Mục tiếp theo", scroll-spy, tìm kiếm (bỏ dấu bằng `normalize('NFD')`), lightbox ảnh, In.
- Kiểm tra: Playwright mở index + trang 01, không lỗi console.

## Task 2: index.html
Bìa (không ô trạng thái), I (#scope), II (#arch) giữ nội dung, lưới 7 thẻ mục III (thẻ soon mờ).

## Task 3: pages/01-master-data.html + ảnh
Chuyển 1.png…5.png vào `images/01-master-data/`; 5 khối màn hình theo khối mẫu; 1.5 gắn nhãn "Minh họa".

## Task 4: pages/02…07 + _mau-trang-muc.html, README.md, .nojekyll
Trang "Sắp có" dùng chung khối; README ghi quy ước 2 người và cách thêm mục/màn hình.

## Task 5: Kiểm tra
Ảnh chụp 1440px/390px; kiểm tra Review Focus 1–5; ghi file về máy người dùng.
