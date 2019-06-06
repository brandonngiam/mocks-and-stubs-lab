const paymentService = require("./paymentService");
const generateQueue = require("./queueService");

const processPayments = () => {
  const paymentQueue = generateQueue();

  while (paymentQueue.length > 0) {
    const currentItem = paymentQueue.shift();
    if (currentItem >= 0) {
      paymentService.makePayment(currentItem);
    } else {
      paymentService.refundPayment(currentItem);
    }
  }
};

// uncomment the next line and run: node src/main.js a few times to see how this function works
// processPayments();

module.exports = processPayments;
