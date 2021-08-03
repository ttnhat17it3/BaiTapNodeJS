/* SINGLETON PATTERN */
// Tạo một class tồn tại một và chỉ một instance của class đấy và đưa cho nó quyền truy cập toàn cục trong suốt ứng dụng
// Có thuộc tính private static instance, private constructor và phương thức public static getInstance()
// Ứng dụng thường gặp: logging, caching
// Lỗi thường gặp trong multi-thread: trong lần chạy đầu tiên uniqueInstance === null, gán uniqueInstance = new Singleton(). Lúc này các thread sẽ trả về uniqueInstance, dẫn đến nhận nhiều giá trị uniqueInstance, không đảm bảo tính duy nhất của uniqueInstance

class Logger {
  constructor() {
    if (Logger.instance == null) {
      this.logs = [];
      Logger.instance = this;
    }
    return Logger.instance;
  }

  log(message) {
    this.logs.push(message);
    console.log(`LOG: ${message}`);
  }

  printLogCount() {
    console.log(`${this.logs.length} Logs`);
  }
}

const logger = new Logger();
Object.freeze(logger);
export default logger;
