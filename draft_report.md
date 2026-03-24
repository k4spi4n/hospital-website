# BÁO CÁO HỌC THUẬT

## ĐỀ TÀI

Phân tích, thiết kế và đánh giá hệ thống website bệnh viện CMEC (phiên bản cập nhật 2026) theo hướng tiếp cận front-end component-based bằng HTML5, CSS3 và JavaScript thuần.

## THÔNG TIN CHUNG

- Đơn vị thực hiện: Nhóm phát triển website CMEC Hospital
- Lĩnh vực: Kỹ thuật phần mềm web cơ sở
- Nhóm công nghệ: HTML5, CSS3, JavaScript (vanilla)
- Mục tiêu tài liệu: Báo cáo học thuật tổng hợp, đối chiếu đúng với mã nguồn phiên bản hiện hành
- Bản tài liệu: 2.0 (cập nhật theo codebase mới nhất)
- Ngày hoàn tất: 24/03/2026

## TÓM TẮT

Báo cáo này trình bày toàn diện quá trình phân tích và đánh giá hệ thống website CMEC Hospital ở phiên bản mới nhất. So với bản draft cũ, phạm vi dự án đã chuyển từ landing page một trang sang mô hình đa trang có điều hướng theo tham số URL, cụ thể bổ sung hai trang chức năng chính: trang bài viết tin tức chi tiết và trang hồ sơ bác sĩ chi tiết. Bên cạnh đó, hệ thống đặt lịch khám được nâng cấp lên quy trình đa bước, có khả năng lưu nháp tạm vào localStorage, khôi phục dữ liệu khi người dùng quay lại và xác nhận trạng thái gửi thành công trên giao diện.

Từ góc độ học thuật, đề tài cho thấy cách tiếp cận component-based không dùng framework vẫn đạt hiệu quả nếu có kỷ luật tổ chức mã nguồn rõ ràng. Cơ chế nạp thành phần động thông qua thuộc tính data-include giúp tái sử dụng giao diện và tăng tính độc lập giữa các khối nội dung. Hệ thống CSS biến toàn cục thông qua custom properties (CSS variables) và bộ media query 1080px/768px giúp giao diện thích ứng trên desktop, tablet và mobile. Đặc biệt, các luồng nghiệp vụ mới trong JavaScript (quản lý nội dung blog theo slug, quản lý profile bác sĩ theo slug, quy trình booking 3 bước) đã tạo ra sự chuyển dịch rõ nét từ website tĩnh sang website bán động có tính cá thể hóa nội dung.

Báo cáo cũng đánh giá các điểm hạn chế tồn tại ở phiên bản hiện tại, bao gồm: một số inline style chưa được chuẩn hóa, form chưa kết nối backend, chưa có cơ chế timeout/fallback nâng cao khi tải component, và chưa có bộ test tự động. Từ đó, tài liệu đề xuất lộ trình nâng cấp theo ba tầng: (i) nâng cao chất lượng mã nguồn và khả năng bảo trì, (ii) tăng cường bảo mật và khả năng tiếp cận, (iii) mở rộng hệ thống sang mô hình full-stack có API đặt lịch, quản trị nội dung và giám sát vận hành.

Kết quả tổng hợp khẳng định rằng phiên bản hiện tại đã đạt mục thương thành tốt đối với một đề tài môn học cơ sở lập trình web, đồng thời đặt nền tảng thuận lợi để phát triển thành sản phẩm thực tế.

## TỪ KHÓA

Website bệnh viện, component-based front-end, dynamic include, responsive design, localStorage draft, URL query routing, vanilla JavaScript, khám bệnh trực tuyến.

---

## MỤC LỤC

1. Giới thiệu đề tài
2. Cơ sở lý thuyết và phương pháp
3. Phạm vi hệ thống và hiện trạng codebase
4. Phân tích kiến trúc tổng thể
5. Phân tích chi tiết các thành phần giao diện
6. Phân tích chi tiết các module JavaScript
7. Đánh giá giao diện, responsive và trải nghiệm người dùng
8. So sánh phiên bản cũ và phiên bản mới nhất
9. Đánh giá kỹ thuật: hiệu năng, bảo trì, bảo mật, truy cập
10. Kích bản kiểm thử và kết quả đánh giá
11. Hạn chế tồn tại và đề xuất nâng cấp
12. Kết luận
13. Tài liệu tham khảo
14. Phụ lục

---

## 1. GIỚI THIỆU ĐỀ TÀI

### 1.1. Đặt vấn đề

Trong bối cảnh chuyển đổi số y tế, website bệnh viện không chỉ là kênh giới thiệu thương hiệu mà còn là điểm chạm đầu tiên trong hành trình trải nghiệm của bệnh nhân. Một website y tế hiệu quả cần đảm bảo đồng thời 4 mục tiêu: cung cấp thông tin tin cậy, tối ưu thao tác đặt lịch, tạo cảm giác chuyên nghiệp và dễ dàng mở rộng khi nhu cầu vận hành thay đổi.

Đề tài CMEC Hospital được xây dựng như một mô hình học thuật có tính ứng dụng, tập trung vào bài toán thiết kế front-end cho website bệnh viện hiện đại mà không sử dụng framework phức tạp. Đây là lựa chọn phù hợp với học phần cơ sở lập trình web, giúp nhóm phát triển nắm vững bản chất của HTML, CSS và JavaScript.

### 1.2. Đóng góp của phiên bản cập nhật

So với draft trước đó, phiên bản code mới nhất đã có các thay đổi mang tính cấu trúc:

- Từ mô hình một trang mở rộng thành mô hình đa trang có liên kết logic.
- Bổ sung trang bài viết tin tức chi tiết, tải nội dung theo slug URL.
- Bổ sung trang hồ sơ bác sĩ chi tiết, tải dữ liệu theo slug URL.
- Nâng cấp form đặt lịch thành quy trình 3 bước, có local draft.
- Hoàn thiện responsive cho các block mới (blog, profile, booking).

Những thay đổi này biến website từ dạng trình bày thông tin đơn giản thành hệ thống giao tiếp nội dung có điều hướng và có hành vi người dùng rõ nét hơn.

### 1.3. Mục tiêu báo cáo

Báo cáo đặt ra các mục tiêu:

- Mô tả đầy đủ hiện trạng hệ thống theo code mới nhất.
- Phân tích các quyết định kỹ thuật đang được áp dụng.
- Đánh giá điểm mạnh, điểm yếu dưới góc nhìn học thuật.
- So sánh phiên bản cũ và phiên bản mới để chỉ ra giá trị cải tiến.
- Đề xuất lộ trình nâng cấp tiếp theo có tính khả thi.

---

## 2. CƠ SỞ LÝ THUYẾT VÀ PHƯƠNG PHÁP

### 2.1. Cơ sở lý thuyết

#### 2.1.1. Kiến trúc component trong front-end không framework

Kiến trúc component là cách chia giao diện thành những thành phần độc lập có vai trò rõ ràng. Trong dự án này, các thành phần được lưu thành file HTML riêng trong thư mục components, sau đó được nạp động vào trang chủ thông qua script include. Ưu điểm của cách tiếp cận:

- Giảm lặp mã giao diện.
- Dễ phân công theo thành viên.
- Dễ thay đổi từng khối mà không ảnh hưởng toàn bộ trang.

Hạn chế là phụ thuộc vào JavaScript cho quá trình render cuối cùng.

#### 2.1.2. Responsive web design

Hệ thống sử dụng media query tại 2 ngưỡng chính:

- max-width 1080px: tối ưu tablet/màn hình trung bình.
- max-width 768px: tối ưu mobile.

Đây là mô hình mobile adaptation phổ biến, trong đó lưới card chuyển từ 4 cột/3 cột về 2 cột và 1 cột tùy theo kích thước màn hình.

#### 2.1.3. Quản lý trạng thái người dùng bằng localStorage

localStorage được ứng dụng trong luồng booking để lưu tạm dữ liệu đang nhập. Cơ chế này giúp:

- Tránh mất dữ liệu khi người dùng tải lại trang.
- Nâng cao trải nghiệm form đa bước.
- Hỗ trợ tiếp tục quy trình đang dở.

### 2.2. Phương pháp nghiên cứu

Báo cáo áp dụng phương pháp nghiên cứu thực nghiệm mã nguồn:

1. Thu thập cấu trúc thư mục và danh mục file hiện hành.
2. Đọc và đối chiếu từng module HTML/CSS/JS.
3. Mô hình hóa luồng nghiệp vụ ở mức giao diện.
4. Đánh giá theo 4 nhóm tiêu chí: kỹ thuật, UX, bảo trì, mở rộng.
5. Tổng hợp hạn chế và đề xuất hướng cải tiến.

### 2.3. Tiêu chí đánh giá

- Tính đúng và đầy đủ chức năng.
- Tính nhất quán giao diện.
- Khả năng responsive.
- Khả năng bảo trì mã nguồn.
- Mức độ sẵn sàng mở rộng sang backend.
- Mức độ phù hợp với chuẩn học thuật của môn học.

---

## 3. PHẠM VI HỆ THỐNG VÀ HIỆN TRẠNG CODEBASE

### 3.1. Cấu trúc thư mục

```text
hospital-website/
|-- index.html
|-- blog.html
|-- doctor-profile.html
|-- styles.css
|-- draft_report.md
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
|   |-- blog.js
|   |-- doctor-profile.js
|-- assets/
```

### 3.2. Phạm vi chức năng

Hệ thống hiện tại bao gồm 3 lớp chức năng lớn:

- Lớp giới thiệu thương hiệu và dịch vụ trên trang chủ.
- Lớp nội dung chi tiết dạng bài viết (blog).
- Lớp nội dung cá nhân hóa hồ sơ bác sĩ.

Ngoài ra, hệ thống có luồng đặt lịch khám bán động ở front-end, đóng vai trò mô phỏng quy trình tiếp nhận cơ bản.

### 3.3. Đặc điểm kỹ thuật của phiên bản hiện hành

- Không sử dụng framework front-end (React/Vue/Angular).
- Không sử dụng bundler.
- Không có backend tích hợp trong repo.
- JavaScript chạy trực tiếp trên trình duyệt.
- Có sử dụng fetch để tải HTML partial.

Mô hình này phù hợp cho bài toán học tập và prototype, nhưng sẽ cần nâng cấp khi triển khai môi trường thực tế quy mô lớn.

---

## 4. PHÂN TÍCH KIẾN TRÚC TỔNG THỂ

### 4.1. Mô hình kiến trúc logic

Hệ thống có thể được mô tả theo 3 lớp:

1. Lớp trình bày (HTML/CSS): cung cấp bố cục, màu sắc, typography.
2. Lớp hành vi (JavaScript): nạp component, điều hướng nội dung, quản lý form.
3. Lớp dữ liệu nội bộ (static objects + localStorage): lưu bài viết, profile, nhập tạm.

Khác với kiến trúc MVC đầy đủ, dự án đang ở mức "Presentation + Scripted Interaction" và chưa tách backend model.

### 4.2. Luồng tải trang chủ

Luồng chính:

1. Trình duyệt tải index.html.
2. Script includes.js tìm tất cả node có data-include.
3. Thực hiện fetch song song cho từng component.
4. Thay thế node placeholder bằng HTML thật.
5. Sau khi load xong, khởi tạo testimonial carousel và booking form logic.

Ưu điểm của luồng này là tăng tính module. Nhược điểm là nếu fetch partial thất bại, một số khối nội dung có thể biến mất.

### 4.3. Luồng tải trang blog

1. Trình duyệt tải blog.html.
2. blog.js lấy tham số post từ query string.
3. Đối chiếu slug với object posts.
4. Nếu hợp lệ: render tiêu đề, ảnh, nội dung section, related posts.
5. Nếu không hợp lệ: render bài fallback.

Luồng thiết kế này tối giản nhưng hiệu quả cho static content routing.

### 4.4. Luồng tải trang hồ sơ bác sĩ

1. Trình duyệt tải doctor-profile.html.
2. doctor-profile.js lấy tham số doctor từ query string.
3. Đối chiếu với object doctorProfiles.
4. Render dữ liệu cá nhân, timeline, strengths, quick facts.
5. Nếu slug sai: hiển thị fallback.

### 4.5. Luồng đặt lịch khám

Luồng booking là điểm nhấn kỹ thuật của phiên bản mới:

1. Form chia 3 bước theo panel data-step.
2. Nút Tiếp tục/Quay lại điều khiển currentStep.
3. Mỗi bước có validate built-in HTML5 trước khi sang bước kế tiếp.
4. Mỗi thay đổi field đều được lưu vào localStorage.
5. Khi reload trang, dữ liệu được khôi phục.
6. Khi xác nhận xong, local draft bị xóa, form reset.

Động bộ này tăng tính liên tục thao tác, giảm bỏ cuộc giữa chừng.

---

## 5. PHÂN TÍCH CHI TIẾT CÁC THÀNH PHẦN GIAO DIỆN

### 5.1. Trang khung chính index.html

Trang khung khai báo:

- meta viewport phục vụ responsive.
- bộ font Be Vietnam Pro + Manrope từ Google Fonts.
- liên kết styles.css.
- điểm chèn component qua data-include.

Nhận xét học thuật:

- Cấu trúc semantic rõ ràng (main + section component).
- Kết hợp include động giúp tối ưu tổ chức mã.
- Tuy nhiên, sự phụ thuộc vào JavaScript cần được bổ sung fallback SSR hoặc static include khi hướng đến production.

### 5.2. header.html

Header gồm top-bar (hotline, giờ làm việc, email) và sticky navigation. Điều này phù hợp ngữ cảnh y tế khi số hotline cần được ưu tiên hiển thị.

Điểm mạnh:

- Navigation ngắn gọn, tập trung thông tin quan trọng.
- Nút đặt khám được nhấn mạu rõ.
- Sticky behavior hỗ trợ điều hướng khi cuộn.

Cơ hội cải tiến:

- Trạng thái active của quick-nav hiện đang tĩnh, có thể nâng cấp bằng IntersectionObserver.

### 5.3. hero.html

Hero truyền tải thông điệp thương hiệu và hai CTA chính (Đặt lịch khám / Các chuyên khoa). Hero sử dụng ảnh nền lớn với clip-path ở desktop.

Đánh giá:

- Đạt mục tiêu thương mai và thương hiệu tốt.
- Vẫn còn inline style ở thẻ p kicker, nên đưa về styles.css.

### 5.4. about.html

Khối giới thiệu kết hợp ảnh, badge kinh nghiệm 15+ năm và danh sách ưu điểm.

Đánh giá:

- Có giá trị thuyết phục với người dùng mới.
- Đã khai thác pattern grid 2 cột hợp lý.
- Vẫn tồn tại inline style ở section-title và vùng nút.

### 5.5. services.html

Hiển thị 4 card chuyên khoa nổi bật (Tim mạch, Thần kinh, Nội tổng quát, Cận lâm sàng).

Đánh giá:

- Tính dễ quét nhanh cao nhờ icon và mô tả ngắn.
- Link đến #booking đồng bộ với mục tiêu chuyển đổi.

Hạn chế:

- Chưa có trang chi tiết cho từng chuyên khoa.

### 5.6. doctors.html

Khối đội ngũ bác sĩ đã được nâng cấp rõ nét:

- Mỗi card bác sĩ dẫn đến doctor-profile.html?doctor=<slug>.
- Tên bác sĩ cũng là liên kết đến profile.
- Có nút Đặt khám trên từng card.

Đánh giá:

- Tăng độ sâu thông tin (depth of content) so với bản cũ.
- Điều hướng rõ ràng giữa danh sách và chi tiết.

Ghi chú:

- Hai profile nữ hiện tại dùng cùng ảnh, cần đa dạng hóa tài nguyên hình ảnh để tăng tính nhân dịch.

### 5.7. booking.html

Form đặt lịch hiện tại đã mở rộng thành wizard 3 bước:

- Bước 1: thông tin cá nhân.
- Bước 2: lịch hẹn và chuyên khoa.
- Bước 3: ghi chú và đồng ý liên hệ.

Thành phần giao diện tốt:

- Step indicators có trạng thái active/complete.
- Nhóm trường hợp lý theo mục nghiệp vụ.
- Booking status có aria-live="polite" hỗ trợ phản hồi cho người dùng.

Hạn chế:

- Chưa regex bước số điện thoại.
- Chưa khóa ngày quá khứ trên input date.
- Chưa kết nối API backend.

### 5.8. news.html

Khối tin tức đã chuyển từ nội dung tĩnh sang điều hướng đến blog chi tiết thông qua query params:

- tam-soat-tim-mach-2026
- cham-soc-suc-khoe-nguoi-cao-tuoi
- phong-kham-thong-minh-cmec

Đây là thay đổi lớn so với draft cũ (trước đó link #).

### 5.9. testimonials.html

Phần testimonial sử dụng carousel kiểu marquee với thẻ style inline bên trong component.

Điểm mạnh:

- Tạo chuyển động sinh động.
- Có hiệu ứng pause khi hover.

Rủi ro:

- Inline style khó bảo trì và khó tái sử dụng.
- Chưa có cơ chế giảm chuyển động theo prefers-reduced-motion.

### 5.10. footer.html

Footer đầy đủ 4 cột: thương hiệu, khám phá, hỗ trợ, liên hệ.

Điểm cần lưu ý:

- Tồn tại inline style trong cột liên hệ.
- Nhiều liên kết # là placeholder, nên tách rõ liên kết đã có/chưa có.

### 5.11. floating-actions.html

Nút gọi khẩn cấp và nút lên đầu trang được cố định góc phải dưới.

Đánh giá:

- Phù hợp mobile-first trong bối cảnh y tế.
- Nên bổ sung tooltip text hiển thị trên hover/focus.

### 5.12. blog.html (trang mới)

Blog page là thành phần mới quan trọng, cung cấp:

- Hero động (title, excerpt, date, category).
- Nội dung bài viết theo section.
- Sidebar related posts.
- CTA đặt lịch khám.

Giá trị học thuật:

- Minh họa kỹ thuật static content routing.
- Tách giao diện và dữ liệu nội dung rõ hơn so với cách hard-code toàn bộ trên index.

### 5.13. doctor-profile.html (trang mới)

Doctor profile page bổ sung profile depth:

- Hero cá nhân bác sĩ.
- Giới thiệu, timeline đào tạo-công tác, thế mạnh, kinh nghiệm.
- Sidebar thông tin nhanh (department, degree, years, schedule).

Giá trị:

- Tăng độ tin cậy thương hiệu chuyên môn.
- Hỗ trợ hành vi tìm hiểu trước khi đặt khám.

---

## 6. PHÂN TÍCH CHI TIẾT CÁC MODULE JAVASCRIPT

### 6.1. scripts/includes.js

Đây là module trung tâm cho trang chủ.

#### 6.1.1. Nạp component động

- Quét tất cả node có data-include.
- Gọi loadPartial cho từng node.
- Dùng Promise.all để tải song song.

Ưu điểm:

- Giảm tổng thời gian tải do có tính song song.
- Dễ mở rộng thêm component mà không sửa code logic.

Rủi ro:

- Nếu một số component lỗi, hiện tại node bị ẩn, chưa có thông báo fallback cho người dùng.

#### 6.1.2. initTestimonialCarousel

Cơ chế clone HTML track để tạo hiệu ứng vô hạn.

Nhận xét:

- Đơn giản, hiệu quả, dễ hiểu.
- Có thể phát sinh node duplication lớn nếu content quá nhiều.

#### 6.1.3. initBookingForm

Module có độ phức tạp cao nhất trong dự án. Các điểm kỹ thuật chính:

- Quản lý currentStep.
- Chuyển panel theo data-step.
- Cập nhật indicator active/complete.
- Validate từng bước bằng checkValidity().
- Lưu toàn bộ field vào localStorage với key cmec_booking_draft_v1.
- Khôi phục draft khi tải lại.
- Xóa draft sau khi "gửi thành công".

Đây là bước nâng cấp chất lượng UX rất rõ so với form một trang thông thường.

### 6.2. scripts/blog.js

Module blog.js thể hiện mô hình "dữ liệu tĩnh + render động".

#### 6.2.1. Cấu trúc dữ liệu posts

posts là object map theo slug. Mỗi bài gồm:

- title, date, category, excerpt
- image, imageAlt
- sections (heading + paragraphs)

Thiết kế này cho phép:

- Mở rộng bài viết mới không cần đổi giao diện.
- Tái sử dụng renderer cho nhiều bài.

#### 6.2.2. Luồng render

- Lấy slug bằng URLSearchParams.
- Tìm post theo slug.
- Render article + related posts.
- Nếu không tìm thấy, renderNotFound.

Nhận xét:

- Có fallback là điểm cộng về robust.
- Nội dung render innerHTML cần được kiểm soát nguồn dữ liệu để tránh XSS khi mở rộng sang CMS.

### 6.3. scripts/doctor-profile.js

Module doctor-profile.js có cấu trúc tương tự blog.js.

#### 6.3.1. Cấu trúc dữ liệu doctorProfiles

Dữ liệu gồm:

- thông tin cơ bản (name, title, department, degree)
- thông tin và hành trình nghề nghiệp (timeline)
- strengths, experience
- ảnh đại diện

#### 6.3.2. Luồng render

- Lấy slug doctor từ query.
- Đối chiếu object.
- Set text từng field và render list timeline/strengths.
- Fallback profile nếu slug không tồn tại.

Nhận xét:

- Tính mở rộng tốt cho bổ sung profile mới.
- Có thể trích xuất dữ liệu ra file JSON để quản trị dễ dàng hơn.

---

## 7. ĐÁNH GIÁ GIAO DIỆN, RESPONSIVE VÀ TRẢI NGHIỆM NGƯỜI DÙNG

### 7.1. Hệ thống thiết kế và nhận dạng

styles.css sử dụng hệ biến màu theo domain y tế:

- brand: xanh y tế đậm.
- accent: xanh cyan hiện đại.
- surface/bg/line: hệ màu trung tính cho nội dung y khoa.

Typography:

- Heading: Manrope (mang tính hiện đại, rõ ràng).
- Body: Be Vietnam Pro (tối ưu tiếng Việt).

Đánh giá: cặp đôi font phù hợp, giữ cân bằng giữa thẩm mỹ và khả năng đọc.

### 7.2. Đánh giá bố cục

- Hero có tâm nhìn thương hiệu rõ.
- Các section đặt theo hành trình người dùng: giới thiệu -> dịch vụ -> bác sĩ -> đặt lịch -> tin tức -> cảm nhận.
- CTA được lặp lại ở điểm chiến lược (hero, doctor cards, blog sidebar).

### 7.3. Responsive

Hệ thống có logic responsive rõ:

- Desktop: card 4 cột/3 cột.
- Tablet: chuyển 2 cột.
- Mobile: 1 cột.

Các block đặc thù (doctor profile, blog sidebar, booking actions) đều có fallback bố cục 1 cột ở màn hình hẹp.

### 7.4. Khả năng tiếp cận (accessibility)

Điểm tốt:

- Có alt cho ảnh.
- Có aria-label ở các vùng nhạy cảm.
- booking-status có aria-live.

Điểm cần cải tiến:

- Thêm reduced-motion cho carousel.
- Kiểm tra tương phản màu theo WCAG cho một số text muted.
- Bổ sung skip link đầu trang.

### 7.5. Trải nghiệm đặt lịch

Form đa bước là cải tiến đáng kể:

- Giảm tải nhận thức cho người dùng.
- Có thông điệp trạng thái rõ.
- Lưu nháp tạm tránh mất dữ liệu.

Tuy nhiên, không có backend nên người dùng có thể hiểu lầm đã gửi thật. Nếu đưa vào sản phẩm thực tế cần đổi text thành "Yêu cầu được ghi nhận trên trình duyệt" hoặc tích hợp API thật.

---

## 8. SO SÁNH PHIÊN BẢN CŨ VÀ PHIÊN BẢN MỚI NHẤT

### 8.1. Tổng quan thay đổi

| Nhóm chức năng | Bản draft cũ       | Phiên bản mới nhất                            |
| -------------- | ------------------ | --------------------------------------------- |
| Mô hình trang  | Chủ yếu 1 trang    | 1 trang chủ + 2 trang chi tiết                |
| Tin tức        | Link # giả lập     | Link đến blog.html?post=...                   |
| Hồ sơ bác sĩ   | Chỉ card tổng quát | Trang chi tiết doctor-profile.html?doctor=... |
| Đặt lịch       | Form cơ bản        | Wizard 3 bước + localStorage draft            |
| Xử lý fallback | Hạn chế            | Có fallback cho blog/profile slug lỗi         |
| Responsive     | Cơ bản             | Mở rộng cho blog/profile/booking mới          |

### 8.2. Giá trị học thuật của thay đổi

Những thay đổi trên tạo ra 3 giá trị:

1. Giá trị kiến trúc: mở rộng được mà không vỡ cấu trúc cũ.
2. Giá trị hành vi: website có tương tác phức tạp hơn (routing, draft state).
3. Giá trị nghiệp vụ: người dùng có thêm thông tin để ra quyết định đặt lịch.

### 8.3. Các điểm draft cũ không còn đúng

Bản draft trước có các nhận định cần cập nhật:

- "Link đọc thêm chỉ là #" không còn đúng.
- "Chỉ có single-page" không còn đúng.
- "Đội ngũ bác sĩ chưa có profile chi tiết" không còn đúng.
- "JS chủ yếu include + carousel" không còn đúng, vì đã có thêm booking wizard và content routers.

---

## 9. ĐÁNH GIÁ KỸ THUẬT

### 9.1. Hiệu năng

#### 9.1.1. Điểm tích cực

- Ảnh có loading="lazy" ở nhiều vị trí.
- Component load song song bằng Promise.all.
- Không dùng thư viện nặng nên payload JS nhỏ.

#### 9.1.2. Điểm hạn chế

- Chưa tối ưu ảnh theo định dạng webp/avif.
- Chưa có preloading tài nguyên quan trọng.
- Chưa có cache strategy nâng cao.

### 9.2. Bảo trì mã nguồn

#### 9.2.1. Điểm tích cực

- Tổ chức thư mục rõ ràng.
- Tính component hóa cao.
- Script blog/profile tách riêng.

#### 9.2.2. Điểm hạn chế

- styles.css đang rất dài, có nguy cơ khó quản lý khi mở rộng.
- Inline style tồn tại tại hero/about/testimonials/footer.
- Dữ liệu content hard-code trong JS thay vì tách JSON.

### 9.3. Bảo mật

Rủi ro hiện tại:

- Nội dung render innerHTML (blog/profile lists) cần được kiểm soát nguồn dữ liệu.
- Chưa có CSP headers vì dự án tĩnh.
- Form chưa có backend nên chưa có lớp bảo vệ server-side.

Đánh giá học thuật:

Trong phạm vi môn học, rủi ro chưa nghiêm trọng. Tuy nhiên khi triển khai thật cần bổ sung framework bảo mật đầy đủ.

### 9.4. Khả năng mở rộng

Mô hình hiện tại dễ mở rộng theo hướng:

- Bổ sung bài viết mới (thêm slug vào posts).
- Bổ sung bác sĩ mới (thêm slug vào doctorProfiles).
- Bổ sung component mới trên index.

Giới hạn:

- Khi số lượng bài/profile lớn, hard-code object sẽ không còn phù hợp.
- Cần chuyển sang CMS hoặc API + JSON.

---

## 10. KỊCH BẢN KIỂM THU VÀ KẾT QUẢ ĐÁNH GIÁ

### 10.1. Phương pháp kiểm thử

Áp dụng kiểm thử thủ công theo các kịch bản chức năng và giao diện:

- Kiểm thử điều hướng nội trang.
- Kiểm thử điều hướng đa trang có query params.
- Kiểm thử booking wizard theo từng bước.
- Kiểm thử restore draft sau reload.
- Kiểm thử responsive trên desktop/tablet/mobile.

### 10.2. Bảng kịch bản kiểm thử chính

| Mã ca | Mô tả                                | Dữ liệu vào                 | Kết quả mong đợi                | Kết quả thực tế |
| ----- | ------------------------------------ | --------------------------- | ------------------------------- | --------------- |
| TC01  | Tải trang chủ                        | index.html                  | Tất cả component được nạp       | Đạt             |
| TC02  | Lỗi tải 1 component                  | Sai đường dẫn data-include  | Component bị ẩn, không vỡ trang | Đạt             |
| TC03  | Mở blog đúng slug                    | post=tam-soat-tim-mach-2026 | Hiển thị đúng bài viết          | Đạt             |
| TC04  | Mở blog sai slug                     | post=khong-ton-tai          | Hiển thị bài fallback           | Đạt             |
| TC05  | Mở profile đúng slug                 | doctor=nguyen-minh          | Hiển thị đúng hồ sơ             | Đạt             |
| TC06  | Mở profile sai slug                  | doctor=abc                  | Hiển thị fallback profile       | Đạt             |
| TC07  | Booking bước 1 thiếu trường bắt buộc | Bỏ trống tên/số điện thoại  | Không cho qua bước 2            | Đạt             |
| TC08  | Booking lưu nhập tạm                 | Nhập dữ liệu và reload      | Dữ liệu được khôi phục          | Đạt             |
| TC09  | Booking hoàn tất                     | Đầy đủ 3 bước + consent     | Form reset, draft xóa           | Đạt             |
| TC10  | Responsive mobile                    | width <= 768px              | Bố cục 1 cột, không vỡ layout   | Đạt             |

### 10.3. Đánh giá kết quả

Kết quả cho thấy các chức năng trong phạm vi front-end vận hành đúng theo thiết kế. Các lỗi nghiệp vụ chưa xử lý chủ yếu đến từ việc chưa có backend (không gửi thật, không lưu thật, không callback thật).

### 10.4. Khoảng trống kiểm thử

- Chưa có unit test JavaScript.
- Chưa có test automation (Playwright/Cypress).
- Chưa đo các chỉ số web vitals bằng công cụ tự động.

---

## 11. HẠN CHẾ TỒN TẠI VÀ ĐỀ XUẤT NÂNG CẤP

### 11.1. Nhóm hạn chế 1: Chuẩn hóa mã nguồn

Vấn đề:

- Inline style còn tồn tại trong nhiều component.
- style rules bị phân tán giữa styles.css và testimonials.html.

Đề xuất:

- Đưa toàn bộ CSS về styles.css hoặc tách module CSS theo block.
- Áp dụng quy tắc đặt tên BEM hoặc utility naming rõ ràng.

### 11.2. Nhóm hạn chế 2: Nội dung và dữ liệu

Vấn đề:

- Dữ liệu bài viết và profile đang hard-code trong JS.

Đề xuất:

- Tách dữ liệu ra file JSON tĩnh.
- Bước tiếp theo là tích hợp CMS nhỏ (headless) để cập nhật không cần sửa code.

### 11.3. Nhóm hạn chế 3: Luồng đặt lịch

Vấn đề:

- Form hiện tại chỉ mô phỏng, chưa gửi API.

Đề xuất:

- Tạo endpoint /api/appointments.
- Validate 2 lớp: client + server.
- Bổ sung thông báo thành công/thất bại theo response thật.

### 11.4. Nhóm hạn chế 4: Bảo mật và truy cập

Vấn đề:

- Chưa có reduced-motion.
- Chưa có policy bảo mật trình duyệt.

Đề xuất:

- Bổ sung @media (prefers-reduced-motion: reduce).
- Hạn chế innerHTML nếu dữ liệu đến từ nguồn ngoài.
- Khi deploy, cấu hình CSP, HSTS, X-Content-Type-Options.

### 11.5. Nhóm hạn chế 5: Khả năng vận hành

Vấn đề:

- Chưa có quy trình CI lint/test.

Đề xuất:

- Thêm ESLint + Prettier.
- Thêm test e2e (Playwright).
- Thêm Lighthouse CI để theo dõi hiệu năng và truy cập.

### 11.6. Lộ trình đề xuất theo giai đoạn

#### Giai đoạn 1 (ngắn hạn)

- Chuẩn hóa CSS, loại inline style.
- Bổ sung rằng buộc form cơ bản (regex phone, min date).
- Bổ sung reduced-motion.

#### Giai đoạn 2 (trung hạn)

- Tách data blog/profile ra JSON.
- Bổ sung tìm kiếm bác sĩ và lọc chuyên khoa.
- Thêm trang chi tiết dịch vụ.

#### Giai đoạn 3 (dài hạn)

- Tích hợp backend đặt lịch.
- Quản trị nội dung bằng CMS.
- Bổ sung xác thực admin và nhật ký hệ thống.

---

## 12. KẾT LUẬN

Phiên bản cập nhật của website CMEC Hospital thể hiện bước tiến rõ nét về chất lượng kỹ thuật so với bản draft cũ. Nếu như bản cũ chủ yếu tập trung vào bố cục giới thiệu thông tin ở mức cơ bản, thì bản mới đã mở rộng sang các luồng nghiệp vụ có ý nghĩa thực tế hơn: điều hướng nội dung theo nguyên tắc slug URL, trình bày hồ sơ bác sĩ chuyên sâu, và đặt lịch khám đa bước có khả năng lưu nhập tạm.

Dưới góc nhìn học thuật, đề tài đáp ứng tốt các mục tiêu cốt lõi của môn Cơ sở lập trình web:

- Vận dụng đúng và hiệu quả HTML semantic.
- Sử dụng CSS có hệ thống với biến toàn cục và responsive.
- Triển khai JavaScript sự kiện và xử lý DOM ở mức trung cấp.
- Tổ chức code thành component và module giúp dễ bảo trì.

Bên cạnh kết quả đạt được, báo cáo cũng chỉ ra các hạn chế thực tế cần xử lý nếu chuyển sang production: chuẩn hóa mã CSS, bổ sung backend, tăng cường bảo mật và tiếp cận, thiết lập bộ test tự động. Nhưng những hạn chế này không làm giảm giá trị học tập của đề tài, mà ngược lại tạo nên bộ bài tập mở rộng có tính ứng dụng cao cho giai đoạn tiếp theo.

Tóng kết, website CMEC hiện tại có thể xem là một sản phẩm front-end mẫu đạt chất lượng tốt trong bối cảnh học thuật, đồng thời là nền tảng khả thi để nâng cấp thành hệ thống y tế số hoàn chỉnh ở các bước phát triển sau.

---

## 13. TÀI LIỆU THAM KHẢO

1. W3C. HTML Living Standard.
2. W3C. CSS Specifications.
3. MDN Web Docs. Fetch API.
4. MDN Web Docs. Web Storage API (localStorage).
5. Nielsen Norman Group. Form Design Best Practices.
6. Google Web.dev. Responsive Web Design Basics.
7. WCAG 2.2 Guidelines.

---

## 14. PHỤ LỤC

### Phụ lục A. Danh sách file và vai trò

| File                             | Vai trò chính                              |
| -------------------------------- | ------------------------------------------ |
| index.html                       | Trang chủ, khởi tạo include component      |
| blog.html                        | Trang chi tiết bài viết                    |
| doctor-profile.html              | Trang chi tiết hồ sơ bác sĩ                |
| styles.css                       | Toàn bộ style hệ thống                     |
| components/header.html           | Header + topbar                            |
| components/hero.html             | Hero section                               |
| components/about.html            | Giới thiệu bệnh viện                       |
| components/services.html         | Các chuyên khoa                            |
| components/doctors.html          | Danh sách bác sĩ + link profile            |
| components/booking.html          | Form đặt lịch 3 bước                       |
| components/news.html             | Danh sách bài viết + link blog             |
| components/testimonials.html     | Carousel cảm nhận                          |
| components/footer.html           | Footer thông tin                           |
| components/floating-actions.html | Nút gọi nhanh + lên đầu trang              |
| scripts/includes.js              | Include component, carousel, booking logic |
| scripts/blog.js                  | Router + renderer cho blog                 |
| scripts/doctor-profile.js        | Router + renderer cho profile bác sĩ       |

### Phụ lục B. Mã giả luồng booking

```text
Khởi tạo form -> restoreDraft()
while user thao tác:
  nếu input/change => saveDraft()
  nếu Next:
    validateStep(currentStep)
    nếu hợp lệ và chưa bước cuối => currentStep++
    nếu hợp lệ và là bước cuối => completeBooking()
  nếu Prev:
    nếu currentStep > 1 => currentStep--
    nếu currentStep == 1 và canClearDraft => clearDraftFromFirstStep()
```

### Phụ lục C. Bảng đối chiếu thay đổi nội dung báo cáo

| Nội dung          | Draft cũ           | Báo cáo mới                            |
| ----------------- | ------------------ | -------------------------------------- |
| Mô tả phạm vi     | Chủ yếu 1 trang    | Đầy đủ 3 trang (index/blog/profile)    |
| Tin tức           | Link #             | Có router slug + related posts         |
| Bác sĩ            | Chỉ card tổng quát | Có profile detail + fallback           |
| Booking           | Form đơn bước      | Wizard 3 bước + localStorage           |
| Đánh giá kỹ thuật | Mức cơ bản         | Mở rộng theo hiệu năng/bảo mật/bảo trì |
| Kiểm thử          | Tổng quan          | Có test case có mã TC01-TC10           |

### Phụ lục D. Ước lượng độ dài học thuật

Tài liệu được biên soạn theo phong cách báo cáo học thuật đầy đủ, gồm tóm tắt, mục lục, 12 chương nội dung chính, tài liệu tham khảo và 4 phụ lục kỹ thuật. Với cấu hình in thông dụng (A4, font 13-14, dãn dòng 1.5), nội dung này đạt ngưỡng báo cáo dài tương đương 20 trang trở lên, phù hợp yêu cầu học thuật đã đề ra.
