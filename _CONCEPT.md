### TECHNICAL CONCEPT
#### Application
1 tổ hợp các module được hiển thị trong các panel slot trên màn hình để hiển thị các chức năng liên quan đến nhau.
Ví dụ: App Flashcard gồm các module có chức năng liên quan đến flashcard như flashcard list/detail ...

#### Module
Tập hợp 1 số panel cụ thể để tạo thành 1 màn hình có chức năng business cụ thể, phục vụ cho Application.

#### Panel
1 khối chức năng trọn vẹn phục vụ cho Application, đặt bên trong 1 panel slot trên màn hình.

#### Layout
Bao gồm toàn bộ màn hình hoặc phần lớn khu vực hiển thị của màn hình, có chức năng phân chia màn hình thành các khu vực riêng biệt (panel) để hiển thị các khối chức năng nhất định.
Ví dụ: layout detailed chia màn hình ra thành 3 panel theo chiều ngang với tỉ lệ 1:3:1, mỗi panel chiếm toàn bộ không gian chiều cao trong layout. Các khối chức năng riêng biệt sẽ được hiển thị trong từng panel.

#### Panel slot
1 khu vực cụ thể trên màn hình, nằm trong layout tại 1 vị trí xác định, dùng để hiển thị 1 khối chức năng riêng biệt.
