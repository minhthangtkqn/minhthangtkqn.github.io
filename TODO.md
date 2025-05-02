### Concept
#### Application
1 tổ hợp các module được hiển thị trong các panel slot trên màn hình để hiển thị các chức năng liên quan đến nhau.
Ví dụ: App Flashcard gồm các module có chức năng liên quan đến flashcard như flashcard list/detail ...

#### Module
Các chức năng phục vụ cho Application, cùng được hiển thị thành 1 khối, có thể đặt trọn vẹn trong 1 panel slot trên màn hình.

#### Layout
Bao gồm toàn bộ màn hình hoặc phần lớn khu vực hiển thị của màn hình, có chức năng phân chia màn hình thành các khu vực riêng biệt (panel) để hiển thị các khối chức năng nhất định.
Ví dụ: layout detailed chia màn hình ra thành 3 panel theo chiều ngang với tỉ lệ 1:3:1, mỗi panel chiếm toàn bộ không gian chiều cao trong layout. Các khối chức năng riêng biệt sẽ được hiển thị trong từng panel.

#### Panel slot (panel)
1 khu vực cụ thể trên màn hình, nằm trong layout tại 1 vị trí xác định, dùng để hiển thị 1 khối chức năng riêng biệt.


### Todo
- [x] rest api for task list
    - [x] database using json file
    - [x] database using posgregSQL
- [x] modulize paginated component
  - [x] paginated list 
  - [x] paginated list row 
  - [x] paginated list loading
- [ ] paginated list
    - [ ] auto active first item if non-select (props) on mount
    - [ ] auto active first item if non-select (props) on change (url, params ...)
- [ ] open side drawer when click logo
    - [x] side drawer application menu
    - [x] top navbar > application menu
    - [ ] top navbar > module menu
    - [ ] (backlog) top navbar > user menu
- [ ] Hệ thống layout & mapping panel slot
- [ ] modulize modal component
- [x] FIX: UPDATING URL PARAM WITHOUT RELOAD THE PAGE
- [ ] feat: tạo category
- [ ] feat: add image (có thể tận dụng các nguồn image free như splash)
- [ ] feat: học flashcard (detail 1 card, lật card giữa title & desc, đọc card, ...)
- [ ] 
