# Dorco WMS – To-Be Solution Design (TSD)

Trang tài liệu giải pháp WMS cho Dorco. HTML tĩnh, không cần build. Chạy được trên Netlify, GitHub Pages và mở thẳng `index.html` trên máy.

## Cấu trúc

| Đường dẫn | Nội dung | Ai sửa |
|---|---|---|
| `index.html` | Trang bìa, A. Mục tiêu và phạm vi, B. Quy trình nghiệp vụ kho, thẻ dẫn vào các mục Giải pháp hệ thống | Người giữ phần chung |
| `pages/NN-*.html` | Nội dung từng mục (01 Master data, 02–09 theo 8 quy trình của sơ đồ kho, 10 Báo cáo, 11 Phát hành tem nhãn) | Người phụ trách mục |
| `pages/_mau-trang-muc.html` | File mẫu để chép khi tạo mục mới | – |
| `images/NN-*/` | Ảnh màn hình của từng mục | Người phụ trách mục |
| `assets/js/menu.js` | **Mục lục chung** (thanh bên, Trước/Sau, thẻ trang chủ đều đọc từ đây) | Mỗi người sửa khối mục của mình |
| `assets/js/layout.js` | Dựng khung trang, tìm kiếm, phóng to ảnh, In | Người giữ phần chung |
| `assets/data/processes.js` | Dữ liệu sơ đồ B. Quy trình nghiệp vụ kho, chép từ dự án Dorco_WMS (`content/data/processes.js`). Sửa quy trình bên Dorco_WMS rồi chép đè file này | Người giữ phần chung |
| `assets/css/*.css` | Giao diện (`tokens.css` chứa màu và chữ) | Người giữ phần chung |

## Phân công mục Giải pháp hệ thống

Chưa chia. Khi chia việc, điền vào bảng dưới và ghi tên vào chú thích từng khối mục trong `assets/js/menu.js`.

| Mục | Người phụ trách | Nhánh |
|---|---|---|
| 1 Master data | | |
| 2 Quy trình mua | | |
| 3 Quy trình nhập xuất dùng | | |
| 4 Quy trình gia công | | |
| 5 Quy trình nhập kho thành phẩm | | |
| 6 Quy trình bán hàng | | |
| 7 Quy trình nhập xuất khác | | |
| 8 Quy trình chuyển kho | | |
| 9 Quy trình kiểm kê | | |
| 10 Báo cáo | | |
| 11 Phát hành tem nhãn | | |

Mỗi người làm trên nhánh của mình, gộp vào `main` bằng Pull Request trên GitHub. Chỉ sửa file trong phần mình phụ trách để tránh xung đột.

## Thêm một màn hình vào mục có sẵn

1. Chép ảnh vào `images/NN-ten-muc/`.
2. Trong `pages/NN-ten-muc.html`, chép một khối từ `<!-- ===== BẮT ĐẦU … -->` đến `<!-- ===== KẾT THÚC … -->`, đổi số, tên, đường dẫn menu, ảnh, mô tả. Đặt `id` mới cho `<section class="screen">`.
3. Trong `assets/js/menu.js`, thêm vào `screens` của mục đó: `{ no: "4.1", title: "Tên màn hình", id: "id-vua-dat" }`.
4. Nếu mục đang là "Sắp có": xóa khối `<div class="soon">` trong trang và xóa `soon: true` của mục trong `menu.js`.

## Thêm một mục mới

1. Chép `pages/_mau-trang-muc.html` thành `pages/NN-ten-muc.html`, đổi `data-page` thành mã trang.
2. Thêm một khối mục vào `assets/js/menu.js` (trường `page` trùng `data-page`).

## Xem thử trên máy

Bấm đúp `index.html`. Không cần cài thêm gì.

## Deploy

- **Netlify:** đã có `netlify.toml` (publish thư mục gốc).
- **GitHub Pages:** Settings › Pages › Deploy from a branch › `main` / `(root)`. File `.nojekyll` đã có sẵn.

Mọi đường dẫn đều là tương đối, nên chạy được cả khi site nằm trong thư mục con (`/ten-repo/`).
