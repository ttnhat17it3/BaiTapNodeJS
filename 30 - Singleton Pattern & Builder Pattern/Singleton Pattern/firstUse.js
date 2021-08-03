import logger from "./singletonPattern.js";

export default function logFirstImplementation() {
  logger.printLogCount();
  logger.log("First File");
  logger.printLogCount();
}
