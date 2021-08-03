/* BUILDER PATTERN */
// Xây dựng một object phức tạp bằng cách sử dụng các object đơn giản và từng bước tiếp cận.
// Đây là một kiểu pattern sáng tạo vì nó cung cấp một trong những cách tốt nhất để tạo một object

class User {
  constructor(name, age, phone, address) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

// Trong class User này, có một vài trường không bắt buộc ví dụ như là sđt hoặc là địa chỉ. Vì vậy khi khởi tạo một User, người lập trình có thể truyền giá trị cho các tham số đó là undefinded, trông không hay lắm, không mang tính giải thích cho chính User được tạo và cũng không biết thứ tự của các giá trị truyền vào và dẫn đến là không biết undefined biểu thị cho điều gì, nếu class User có thêm nhiều thuộc tính nữa thì khi khởi tạo nhìn càng rối hơn
// Lỡ không may class User có quá nhiều thuộc tính và khi tạo đối tượng User với nhiều thuộc tính như vậy làm cho đoạn code nhìn rối mắt
// Cho nên Builder Pattern ra đời để giải quyết vấn đề đó
// Tạo class User với các trường bắt buộc
class User {
  constructor(name) {
    this.name = name;
  }
}

// Tạo class UserBuilder là class để xây dựng nên một class User hoàn chỉnh
class UserBuilder {
  // Tạo constructor với các thuộc tính bắt buộc
  constructor(name) {
    this.user = new User(name);
  }
  // Tạo các phương thức set giá trị cho các thuộc tính tùy chọn và trả về chính builder để có thể set nhiều thuộc tính cùng lúc
  setAge(age) {
    this.user.age = age;
    return this;
  }

  setPhone(phone) {
    this.user.phone = phone;
    return this;
  }

  setAddress(address) {
    this.user.address = address;
    return this;
  }

  // Tạo phương thức build() để tạo một builder hoàn chỉnh
  build() {
    return this.user;
  }
}

// Khởi tạo User Builder với trường name bắt buộc
const user1 = new UserBuilder("Bin").build();
// User { name: 'Bin' }

// Ta có thể thêm các thuộc tính tùy chọn khác bằng các phương thức đã thiết lập trong UserBuilder
const user2 = new UserBuilder("Bin").setAge(23).setAddress("Thanh Khe").build();
// User { name: 'Bin', age: 23, address: 'Thanh Khe' }

// Một cách khác để sử dụng Builder Pattern ngắn gọn hơn thay vì tạo các class nhỏ rồi sau đó là class Builder tổng thể
// Tạo một class với các thuộc tính tùy chọn được truyền vào trong object với giá trị mặc định là object rỗng
class Address {
  constructor(city, district) {
    this.city = city;
    this.district = district;
  }
}

class NewUserBuilder {
  constructor(name, { age, phone, address } = {}) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

// Khi tạo User chỉ với giá trị của thuộc tính bắt buộc thì giá trị của các thuộc tính tùy chọn tự động trở thành undefined
const user3 = new NewUserBuilder("Bin");
// NewUserBuilder {
//   name: 'Bin',
//   age: undefined,
//   phone: undefined,
//   address: undefined
// }

// Thêm các giá trị của thuộc tính tùy chọn mà ta muốn
const user4 = new NewUserBuilder("Bin", {
  age: 23,
  phone: 123456,
  address: new Address("Da Nang", "Thanh Khe"),
});
// NewUserBuilder {
//   name: 'Bin',
//   age: 23,
//   phone: 123456,
//   address: Address { city: 'Da Nang', district: 'Thanh Khe' }
// }
