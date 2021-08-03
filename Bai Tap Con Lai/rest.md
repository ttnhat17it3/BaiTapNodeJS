1. Phân biệt setTimeout và setInterval

- setTimeout: hàm thực thi sau bao nhiêu ms kể từ khi setTimeout được gọi
- setInterval: thiết lập độ trễ cho các hàm sẽ được thực thiện lặp lại sau x ms
  => Khác nhau: setTimeout chỉ kích hoạt hàm một lần, setInterval kích hoạt hàm sau một khoảng thời gian nhất định cho đến khi gọi clearInterval để dừng

2. Hiện tượng callback hell là gì

- Callback hell là hiện tượng callback lồng callback lồng callback. Callback trên thực hiện xong thì đến callback dưới:

```js
  doSomething(function (a) {
    doSomethingMore(function (b) {
      doSomethingMore(function (c) {
        doSomethingMore(function (d) {});
      });
    });
  });
```

3. Phân biệt let và const

- Giống: đều có scope là block scope, không thể hoisting
- Khác:
  - let: có thể khai báo lại giá trị cho biến
  - const: không thể khai báo lại giá trị khi đã khai báo giá trị trước đó, trừ biến có kiểu reference thì có thể cập nhật được giá trị cho thuộc tính của biến

4. Phân biệt forEach, filter, map, every, some, for thường

```js
const users = [
  { name: "Bin", age: 23 },
  { name: "Ben", age: 18 },
  { name: "Bon", age: 30 },
];
```

- forEach: lặp qua từng phần tử của mảng

```js
users.forEach((user) => console.log(user));
// { name: 'Bin', age: 23 }
// { name: 'Ben', age: 18 }
// { name: 'Bon', age: 30 }
```

- map: tạo một mảng mới bằng cách thực hiện hàm trên mỗi phần tử của mảng

```js
console.log(users.map((user) => user.name));
// [ 'Bin', 'Ben', 'Bon' ]
```

- filter: trả về một mảng với các phẩn tử thỏa mãn điều kiện nào đó

```js
console.log(users.filter((user) => user.age > 20));
// [ { name: 'Bin', age: 23 }, { name: 'Bon', age: 30 } ]
```

- every: trả về true nếu tất cả các phần tử của mảng thỏa mãn điều kiện nào đó và ngược lại

```js
console.log(users.every((user) => user.age > 20));
// false
```

- some: trả về true nếu có ít nhất một phần tử của mảng thỏa mãn điều kiện nào đó và ngược lại

```js
console.log(users.some((user) => user.age > 20));
// true
```

- for in: duyệt qua các key của object

```js
for (let key in users[0]) console.log(key);
// name
// age
```

- for of: duyệt qua các value của object

```js
for (let user of users) console.log(user);
// { name: 'Bin', age: 23 }
// { name: 'Ben', age: 18 }
// { name: 'Bon', age: 30 }
```

5. Phân biệt giá trị và địa chỉ của biến

- Giá trị của biến: giá trị của các biến độc lập, không thay đổi khi sao chép giá trị của biến này qua biến khác, áp dụng với kiểu dữ liệu primitive (Number, String, Boolean, undefined, null, Symbol)
- Địa chỉ của biến: khi các biến trỏ cùng vào một địa chỉ thì giá trị của các biến đó phụ thuộc nhau, khi giá trị của một biến thay đổi thì giá trị của các biến còn lại thay đổi theo, áp dụng với kiểu dữ liệu Object, Array, Function

7. Phân biệt call, bind và apply

- bind: xác định tham số this cho một function
- call: xác định tham số this và gọi function với các tham số truyền vào, thường dùng để mượn hàm
- apply: giống call nhưng các tham số được truyền toàn bộ vào trong mảng

```js
const person = {
  name: "Bin",
  age: 18,
};

function getInfo(address) {
  console.log(`${this.name}, ${this.age}, ${address}`);
}

console.log(getAge.bind(person, 23, "DN")); // [Function: bound getAge]
console.log(getInfo.call(person, "DN")); // Bin, 18, DN
console.log(getInfo.apply(person, ["DN"])); // Bin, 18, DN
```

8. Javascript có bao nhiêu kiểu dữ liệu

- Javascript có 7 kiểu dữ liệu, trong đó:
```
  - Number      |
  - String      |
  - null        |
  - undefinded  | => được gọi là kiểu primitive.
  - boolean     |
  - Symbol      |

  - Object được gọi là kiểu non-primitive
```

11. Các cách để clone một Object. Ưu điểm và nhược điểm

- Sử dụng toán tử gán:
  - Ưu: nhanh, gọn, lẹ, dễ hiểu
  - Nhược: vì object là kiểu tham chiếu nên khi gán thì obj2 trỏ đến địa chỉ của obj1, dẫn đến khi thay đổi giá trị của obj1 thì giá trị của obj2 cũng thay đổi theo

```js
const obj1 = { name: "Bin", age: 23, address: { city: "ĐN", district: "TK" } };
const obj2 = obj1;

obj2.name = "Ben";
console.log(obj1); // { name: 'Ben', age: 23, address: { city: 'ĐN', district: 'TK' } }
console.log(obj2); // { name: 'Ben', age: 23, address: { city: 'ĐN', district: 'TK' } }
```

- Sử dụng spread:
  - Ưu: nhanh, gọn, nhìn mới mới, ngầu ngầu
  - Nhược: có thể chỉnh sửa được giá trị của obj1 hay obj2 mà không ảnh hưởng đến giá trị của nhau nhưng chỉ thực hiện được với các giá trị của các key cấp cao nhất. Khi sử dụng spread thì các giá trị của key cấp cao nhất sẽ được sao chép giá trị, còn các giá trị của các key cấp thấp hơn (array hay object lồng nhau) thì vẫn là tham chiếu, hay còn gọi là clone "nông"

```js
const obj2 = { ...obj1 };

obj2.name = "Ben";
obj2.address.city = "Hue";
console.log(obj1); // { name: 'Bin', age: 23, address: { city: 'Hue', district: 'TK' } }
console.log(obj2); // { name: 'Ben', age: 23, address: { city: 'Hue', district: 'TK' } }
```

- Sử dụng Object.assign():
  - Ưu: nhìn khá tường minh, dễ hiểu
  - Nhược: giống với cách sử dụng spread

```js
const obj2 = Object.assign({}, obj1);
```

- Sử dụng JSON:
  - Ưu: có thể thay đổi giá trị của các obj mà không bị ảnh hưởng đến giá trị của các obj khác, kể cả nhiều cấp, hay còn gọi là clone "sâu"
  - Nhược: nhìn hơi dài

```js
const obj2 = JSON.parse(JSON.stringify(obj1));

obj2.name = "Ben";
obj2.address.city = "Hue";
console.log(obj1); // { name: 'Bin', age: 23, address: { city: 'ĐN', district: 'TK' } }
console.log(obj2); // { name: 'Ben', age: 23, address: { city: 'Hue', district: 'TK' } }
```

13. Toán tử == và === khác và giống nhau như thế nào. Switch case là so sánh == hay ===

- Toán tử == so sánh hai biến cùng giá trị mà không quan tâm đến kiểu dữ liệu. `1 == "1"` // true
- Toán tử === so sánh cả giá trị và kiểu dữ liệu của hai biến. `1 === "1"` // false
- Switch case là so sánh ===

14. Phân biệt require và import

- require:
  - Có thể gọi bất cứ đâu trong chương trình
  - Thực hiện đồng bộ
  - Lấy hết cả file, package => lãng phí bộ nhớ
- import:
  - Chỉ có thể gọi ở đầu chương trình
  - Thực hiện bất đồng bộ
  - Cho phép lấy những phần thực sự cần thiết => tiết kiệm bộ nhớ
  - Muốn dùng import thì phải có type="module" ở thẻ `<script></script>`
