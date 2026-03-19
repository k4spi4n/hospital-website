# BÁO CÁO MÔN CƠ SỞ LẬP TRÌNH WEB

## 1. Thông tin chung

- Tên dự án: Hospital Website (CMEC Hospital)
- Loại dự án: Website giới thiệu bệnh viện, 1 trang (single-page), tách thành nhiều thành phần HTML
- Công nghệ sử dụng: HTML5, CSS3, JavaScript thuần
- Ngày phân tích: 19/03/2026

## 2. Phân tích bài toán

### 2.1. Bài toán đặt ra

Xây dựng một trang web giới thiệu bệnh viện hiện đại với các yêu cầu chính:

- Trình bày thông tin thương hiệu bệnh viện rõ ràng, chuyên nghiệp.
- Cung cấp các khối nội dung quan trọng: giới thiệu, dịch vụ, đội ngũ bác sĩ, tin tức, cảm nhận bệnh nhân.
- Hỗ trợ người dùng đặt lịch khám nhanh qua biểu mẫu trực tuyến.
- Tối ưu trải nghiệm trên cả thiết bị desktop và mobile.

### 2.2. Đối tượng sử dụng

- Bệnh nhân và người nhà cần tìm thông tin khám chữa bệnh.
- Người dùng muốn đặt lịch khám nhanh.
- Người truy cập muốn tham khảo uy tín bệnh viện qua đội ngũ và phản hồi thực tế.

### 2.3. Mục tiêu kỹ thuật

- Giao diện trực quan, màu sắc phù hợp lĩnh vực y tế.
- Cấu trúc thành phần rõ ràng, dễ bảo trì.
- Tái sử dụng thành phần bằng cơ chế include động bằng JavaScript.
- Đảm bảo responsive với media query.

## 3. Cấu trúc dự án

```text
hospital-website/
|-- index.html
|-- styles.css
|-- components/
|   |-- header.html
|   |-- hero.html
|   |-- about.html
|   |-- services.html
|   |-- doctors.html
|   |-- booking.html
|   |-- news.html
|   |-- testimonials.html
|   |-- footer.html
|   |-- floating-actions.html
|-- scripts/
|   |-- includes.js
|-- assets/
```

### 3.1. Ý nghĩa tổ chức thư mục

- Tách phần giao diện thành các component trong thư mục components giúp dễ phân công theo nhóm và bảo trì.
- styles.css tập trung toàn bộ định dạng giao diện.
- includes.js nạp các component vào index.html theo thuộc tính data-include.
- assets chứa tài nguyên ảnh phục vụ hiển thị.

## 4. Phân tích từng file

### 4.1. index.html

- Vai trò: Trang khung chính, khai báo font, CSS, script và các điểm chèn component.
- Điểm tốt:
  - Sử dụng cấu trúc HTML5 chuẩn, có meta viewport.
  - Cách chia layout theo data-include gọn, dễ đọc.
- Hạn chế:
  - Toàn bộ nội dung phụ thuộc JavaScript để render component; khi JS lỗi, trang thiếu nội dung.

### 4.2. styles.css

- Vai trò: Định nghĩa toàn bộ giao diện, gồm biến màu, typography, layout, responsive.
- Điểm tốt:
  - Dùng CSS variables trong :root giúp đồng bộ theme.
  - Phân nhóm style rõ: header, hero, cards, booking, footer, floating actions.
  - Có media query cho mốc 1080px và 768px.
- Hạn chế:
  - File khá dài, có thể tách theo module để dễ quản lý hơn khi dự án lớn.

### 4.3. scripts/includes.js

- Vai trò:
  - Tìm các phần tử có data-include.
  - fetch từng component HTML và thay thế vào DOM.
  - Khởi tạo carousel cảm nhận bệnh nhân sau khi nạp xong.
- Điểm tốt:
  - Tận dụng Promise.all để nạp đồng thời các thành phần.
  - Có xử lý lỗi cơ bản khi fetch thất bại.
- Hạn chế:
  - Chưa có cơ chế fallback nội dung khi không tải được component.
  - Chưa có xử lý nâng cao cho truy cập chậm hoặc timeout.

### 4.4. components/header.html

- Vai trò: Thanh top bar và thanh điều hướng chính.
- Điểm tốt:
  - Có hotline, email, điều hướng nhanh và nút đặt khám nổi bật.
  - Header sticky giúp điều hướng thuận tiện.
- Hạn chế:
  - Điều hướng chỉ neo nội trang, chưa có điều hướng đa trang.

### 4.5. components/hero.html

- Vai trò: Khu vực giới thiệu chính đầu trang (banner).
- Điểm tốt:
  - Thông điệp rõ ràng, CTA mạnh (Đặt lịch khám, Các chuyên khoa).
  - Thiết kế nổi bật, phù hợp trang chủ bệnh viện.
- Hạn chế:
  - Dùng inline style cho nhãn đầu mục, chưa đồng nhất theo chuẩn tách CSS.

### 4.6. components/about.html

- Vai trò: Giới thiệu năng lực bệnh viện.
- Điểm tốt:
  - Có hình ảnh, số năm kinh nghiệm, danh sách ưu điểm.
  - Nội dung có tính thuyết phục cao cho người xem mới.
- Hạn chế:
  - Có inline style trong tiêu đề và phần nút, nên đưa về styles.css.

### 4.7. components/services.html

- Vai trò: Trình bày các chuyên khoa chính.
- Điểm tốt:
  - Sử dụng card layout nhất quán.
  - Nội dung dễ quét, có liên kết đặt khám trực tiếp.
- Hạn chế:
  - Chưa có trang chi tiết cho từng chuyên khoa (liên kết hiện chỉ trỏ đến form đặt khám).

### 4.8. components/doctors.html

- Vai trò: Giới thiệu đội ngũ bác sĩ.
- Điểm tốt:
  - Có ảnh, học hàm/học vị và chuyên khoa.
  - CTA đặt khám cho từng bác sĩ.
- Hạn chế:
  - Có lặp ảnh bác sĩ ở hai thẻ card cuối, làm giảm tính đa dạng thị giác.

### 4.9. components/booking.html

- Vai trò: Form đặt lịch khám trực tuyến.
- Điểm tốt:
  - Trường dữ liệu hợp lý: họ tên, SĐT, ngày, khung giờ, chuyên khoa.
  - UX tốt nhờ chia nhóm trường theo hàng.
- Hạn chế:
  - action=# nên chưa kết nối backend.
  - Chưa có kiểm tra hợp lệ nâng cao ở phía client (format SĐT, ngày hợp lệ, chống spam).

### 4.10. components/news.html

- Vai trò: Hiển thị tin tức và sự kiện y tế.
- Điểm tốt:
  - Dạng article hợp semantic.
  - Bố cục card giúp đọc nhanh.
- Hạn chế:
  - Link Đọc thêm đang dùng #, chưa liên kết nội dung chi tiết.

### 4.11. components/testimonials.html

- Vai trò: Khu vực đánh giá bệnh nhân.
- Điểm tốt:
  - Nhiều phản hồi cụ thể, tăng độ tin cậy.
  - Hiệu ứng chạy ngang tạo cảm giác sinh động.
- Hạn chế:
  - Có thẻ style đặt trực tiếp trong component, chưa tách về styles.css.
  - Cần cân nhắc khả năng truy cập (người dùng nhạy cảm chuyển động).

### 4.12. components/footer.html

- Vai trò: Thông tin cuối trang, liên hệ, liên kết phụ trợ.
- Điểm tốt:
  - Đầy đủ nhóm thông tin: thương hiệu, khám phá, hỗ trợ, liên hệ.
  - Thẩm mỹ đồng bộ với tổng thể.
- Hạn chế:
  - Một số style vẫn để inline, cần chuẩn hóa tách CSS.

### 4.13. components/floating-actions.html

- Vai trò: Nút hành động nhanh (gọi khẩn cấp, lên đầu trang).
- Điểm tốt:
  - Hữu ích trên thiết bị di động.
  - Tăng khả năng thao tác nhanh cho người dùng.
- Hạn chế:
  - Có thể cần thêm nhãn trực quan hoặc tooltip cho tính thân thiện.

## 5. Đánh giá tổng thể theo tiêu chí môn học

### 5.1. Về HTML

- Đã sử dụng semantic tương đối tốt: section, article, nav, header, footer.
- Có alt cho ảnh và thuộc tính loading="lazy" cho tối ưu tải.

### 5.2. Về CSS

- Áp dụng tốt biến CSS, grid, responsive, shadow, transition.
- Thiết kế thống nhất tông y tế, chuyên nghiệp.

### 5.3. Về JavaScript

- Script ngắn gọn, đúng trọng tâm cho include component và carousel.
- Có xử lý lỗi cơ bản khi tải partial thất bại.

### 5.4. Về trải nghiệm người dùng

- Điều hướng rõ ràng, CTA nổi bật.
- Bố cục dễ đọc, phù hợp website giới thiệu dịch vụ y tế.

## 6. Điểm mạnh nổi bật

- Cấu trúc component hóa rõ ràng, dễ chia việc theo nhóm.
- Giao diện hiện đại, đồng nhất màu sắc và font chữ.
- Có đầy đủ nội dung truyền thông cần thiết cho một landing page bệnh viện.
- Form đặt khám trực tuyến tăng tính thực tiễn của sản phẩm.

## 7. Hạn chế và hướng cải tiến

### 7.1. Hạn chế hiện tại

- Chưa có backend cho form đặt lịch.
- Một số nơi còn dùng inline style, chưa tối ưu bảo trì.
- Link giả lập (#) còn nhiều, chưa có trang chi tiết.
- Chưa có cơ chế truy cập thay thế khi JavaScript bị tắt.

### 7.2. Đề xuất cải tiến

- Kết nối form tới API xử lý đặt lịch và phản hồi trạng thái gửi.
- Chuẩn hóa toàn bộ style về styles.css, loại bỏ inline style.
- Tách styles.css thành nhiều file theo khối chức năng nếu mở rộng dự án.
- Bổ sung kiểm tra dữ liệu form phía client và phía server.
- Tạo các trang chi tiết cho tin tức, dịch vụ, bác sĩ.
- Bổ sung tối ưu SEO cơ bản: meta description, Open Graph, cấu trúc heading chặt chẽ hơn.

## 8. Kết luận

Dự án Hospital Website đã đáp ứng tốt mục tiêu của bài tập môn Cơ sở lập trình web: xây dựng một website giới thiệu hoàn chỉnh với bố cục hiện đại, responsive, có khả năng tái sử dụng thành phần và tích hợp hành vi JavaScript cơ bản. Với một số cải tiến về chuẩn hóa mã nguồn, kết nối backend và tối ưu truy cập, dự án có thể phát triển thành sản phẩm thực tế có chất lượng cao hơn.
