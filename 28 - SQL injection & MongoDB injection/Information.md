<!-- SQL injection -->

SQL injection là một kỹ thuật cho phép những kẻ tấn công lợi dụng lỗ hổng của việc kiểm tra dữ liệu đầu vào trong các ứng dụng web và các thông báo lỗi của hệ quản trị cơ sở dữ liệu trả về để inject (tiêm vào) và thi hành các câu lệnh SQL bất hợp pháp. SQL injection có thể cho phép những kẻ tấn công thực hiện các thao tác, delete, insert, update, v.v. trên cơ sở dữ liệu của ứng dụng, thậm chí là server mà ứng dụng đó đang chạy

Ví dụ: ta có một câu lệnh query:
statement = "SELECT \* FROM users WHERE name = '" + userName + "';"

Câu lệnh này được thiết kế để trả về các bản ghi tên người dùng cụ thể từ bảng những người dùng. Tuy nhiên, nếu biến "userName" được nhập chính xác theo một cách nào đó bởi người dùng ác ý, nó có thể trở thành một câu truy vấn SQL với mục đích khác hẳn so với mong muốn của tác giả đoạn mã trên. Ví dụ, ta nhập vào giá trị của biến userName như sau:

a' or 't'='t

Khiến cho câu query phía trên được hiểu như sau:

SELECT \* FROM users WHERE name = 'a' or 't'='t';

<!-- MongoDB injection -->

Mặc dù MongoDB là CSDL NoSQL nhưng vẫn có cách để tấn công theo như mục đích giống SQL injection. Ví dụ ta có một câu truy vấn sau:

db.users.find({username: username, password: password});

Giả sử tại trường username, hoặc tham số được truyền vào dưới dạng một đối tượng JSON. Nếu đầu vào là một JSON Document, tin tặc có thể bypass login tương tự như SQL Injection:
{
"username": {"$gt": ""},
    "password": {"$gt": ""}
}

Code xử lý yêu cầu có dạng như sau:
app.post('/', function (req, res) {
db.users.find({
username: req.body.username,
password: req.body.password
}, function (err, users) {
// TODO: handle the rest
});
});

Trong MongoDB, trường $gt có nghĩa đặc biệt, được sử dụng trong so sánh lớn hơn. Do đó username và password từ cơ sở dữ liệu sẽ được so sánh với dữ liệu nhập vào là chuỗi kí tự trống “” và kết quả câu lệnh trả về là TRUE. Request dùng để khai thác sẽ có dạng như sau:

POST http://target/ HTTP/1.1
Content-Type: application/json
{
"username": {"$gt": ""},
"password": {"$gt": ""}
}
