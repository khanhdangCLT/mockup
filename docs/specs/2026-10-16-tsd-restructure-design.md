# Thiết kế: Cấu trúc lại và đổi giao diện trang Dorco WMS – TSD

Ngày: 2026-10-16 · Người yêu cầu: Hoa Dinh · Trạng thái: chờ duyệt

## 1. Mục tiêu

Trang `Dorco WMS – To-Be Solution Design (TSD)` dùng để trình bày giải pháp với khách Dorco, kèm ảnh màn hình WMS thật. Cần:

- Dễ bổ sung mục và màn hình mới sau này mà không phải sửa CSS/JS.
- Deploy được cả trên Netlify và GitHub Pages, không cần bước build.
- Giao diện mới theo phong cách trang tham khảo https://mes-process.netlify.app (bản sáng).

Tiêu chí hoàn thành: trang mở đúng trên Netlify, GitHub Pages (kể cả đường dẫn `/ten-repo/`) và mở trực tiếp bằng file; thêm một màn hình mới chỉ cần chép một khối HTML mẫu và thêm ảnh.

## 2. Quyết định đã chốt với người dùng

| Câu hỏi | Lựa chọn |
|---|---|
| Cấu trúc trang | Giữ **một file `index.html`**, sắp xếp lại mã bên trong |
| Phong cách | Theo trang mes-process, bản sáng (đã duyệt trang mẫu) |
| Mục 2 đến 7 (chưa có ảnh thật) | **Ẩn tạm**, hiện khung "Sắp có" |

## 3. Cấu trúc file

```
Dorco_WMS_Mockup/
├─ index.html              nội dung, chia khối có chú thích <!-- ===== BẮT ĐẦU / KẾT THÚC: ... ===== -->
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css        biến màu, chữ, khoảng cách
│  │  ├─ base.css          reset, chữ, liên kết, focus
│  │  ├─ layout.css        thanh bên, thanh trên, vùng nội dung, responsive
│  │  └─ components.css    khối màn hình, thẻ Mô tả, Lưu ý nghiệp vụ, Sắp có, bảng, khung ảnh
│  └─ js/app.js            menu điện thoại, mục lục tự sáng, tìm kiếm mục lục, Trước/Sau, phóng to ảnh, In
├─ images/                 giữ 1.png…5.png; ảnh mới đặt images/<so-muc>-<ten>/...
├─ docs/specs/             tài liệu thiết kế (file này)
├─ netlify.toml            publish = "."
├─ .nojekyll               cho GitHub Pages
└─ README.md               cách thêm mục / màn hình mới
```

Không dùng `fetch`, không module ES, không build. Mọi đường dẫn tương đối (`assets/...`, `images/...`), không bắt đầu bằng `/`.
Bỏ `assets/style.css` và `assets/app.js` cũ sau khi chuyển xong.

## 4. Nội dung index.html

Thứ tự: Bìa → I. Mục tiêu và phạm vi → II. Kiến trúc và phân vai → III. Giải pháp hệ thống:

- 1. Master data: 1.1 Danh mục tổ chức (1.png), 1.2 Danh mục kho (2.png), 1.3 Danh mục vị trí (3.png + 4.png), 1.4 Đối tác kinh doanh (5.png), 1.5 Phát hành tem NVL (mockup tự dựng, ghi rõ "Minh họa").
- 2 đến 7: mỗi mục một khối "Sắp có". Nội dung mockup cũ của mục 2–7 không đưa vào trang (vẫn còn trong lịch sử Git).

Nội dung chữ của I, II và 1.1–1.5 giữ như hiện tại.

### Khối mẫu một màn hình

```html
<!-- ===== BẮT ĐẦU: 1.3 Danh mục vị trí ===== -->
<section class="screen" id="m-location" data-title="1.3 Danh mục vị trí">
  <h3 class="screen__title"><span class="no">1.3</span>Danh mục vị trí</h3>
  <p class="screen__path">Thiết lập chung › Thiết lập tổ chức › Danh mục vị trí</p>
  <div class="screen__body">
    <div class="screen__shots">
      <figure class="shot"><figcaption>Danh sách vị trí</figcaption><img src="images/3.png" alt="..."></figure>
    </div>
    <aside class="screen__notes">
      <div class="note"><h4>Mô tả</h4><p>...</p></div>
      <div class="note note--biz"><h4>Lưu ý nghiệp vụ</h4><ul><li>...</li></ul></div>
    </aside>
  </div>
</section>
<!-- ===== KẾT THÚC: 1.3 Danh mục vị trí ===== -->
```

Thêm ảnh thứ hai: thêm một `<figure class="shot">`. Không có lưu ý: bỏ khối `note--biz`.
Mục lục bên trái viết tay trong `index.html` (một dòng `<a>` cho mỗi màn hình); README ghi rõ phải thêm dòng này.

## 5. Giao diện

Token (lấy từ bản sáng của trang tham khảo):

| Tên | Giá trị | Dùng cho |
|---|---|---|
| bg | #F3F6F3 | nền trang |
| panel | #FFFFFF | thẻ, khung ảnh |
| panel2 | #E8EEE9 | thanh tiêu đề khung ảnh |
| side | #E0ECE5 | thanh bên |
| ink | #172C22 | chữ chính |
| muted | #4D6658 | chữ phụ, đường dẫn |
| line | #C5D5CB | viền |
| green | #167451 | màu nhấn, số mục, nút chính |
| on | #BFD8C9 | mục lục đang chọn |
| gold / goldbg | #8C6B12 / #FBF3DC | thẻ Lưu ý nghiệp vụ |

Chữ: "Segoe UI", system-ui, Arial; nội dung 16px/1.65; tiêu đề trang 30px đậm; tiêu đề màn hình 24px; bo góc 8px (mục lục), 12px (thẻ, khung).

Bố cục:
- Thanh bên trái 300px, dính: tên tài liệu, ô tìm kiếm lọc mục lục, nhóm Tổng quan / 1. Master data / Quy trình. Mục 2–7 làm mờ.
- Thanh trên dính: đường dẫn mục đang đọc, nút Trước, Sau, In/PDF.
- Mỗi màn hình hai cột: ảnh bên trái (khung có thanh tiêu đề + nút Phóng to), thẻ ghi chú bên phải 340px dính khi cuộn. Dưới 1000px chuyển thành một cột; dưới 820px thanh bên thu vào nút Menu.

## 6. Hành vi JS

- Mục lục tự sáng theo mục đang xem; đường dẫn trên thanh trên cập nhật theo.
- Ô tìm kiếm lọc dòng mục lục theo chữ gõ (không dấu cũng tìm được).
- Trước/Sau nhảy sang màn hình kề bên.
- Phóng to: mở ảnh toàn màn hình, đóng bằng Esc hoặc bấm nền.
- In/PDF: `window.print()`, CSS in ẩn thanh bên/thanh trên.
- Thiếu JS thì trang vẫn đọc được đầy đủ.

## 7. Chất lượng và kiểm tra

- Không lỗi console; không cuộn ngang ở 390px; focus bàn phím nhìn thấy; tôn trọng giảm chuyển động.
- Kiểm tra bằng ảnh chụp ở 1440px và 390px.
- Kiểm tra đường dẫn tương đối bằng cách mở trong thư mục con (giả lập GitHub Pages `/Dorco_WMS_Mockup/`).

## 8. Ngoài phạm vi

Không đổi nội dung chữ ngoài phần nêu trên; không làm lại mục 2–7; không tự push Git.
