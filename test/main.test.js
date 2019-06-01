const processPayments = require("../src/main");
const { makePayment, refundPayment } = require("../src/paymentService");
const generateQueue = require("../src/queueService");

jest.mock("../src/queueService");
jest.mock("../src/paymentService");

describe("processing Payments", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("does not call makePayment or refundPayment when paymentQueue is empty", () => {
    generateQueue.mockImplementation(() => []);
    processPayments();

    expect(generateQueue).toHaveBeenCalledTimes(1);

    expect(makePayment).toHaveBeenCalledTimes(0);
    expect(refundPayment).toHaveBeenCalledTimes(0);
  });

  it("calls makePayment when next item in paymentQueue is positive", () => {
    generateQueue.mockImplementation(() => [10]);
    processPayments();

    expect(generateQueue).toHaveBeenCalledTimes(1);

    expect(makePayment).toHaveBeenCalledTimes(1);
    expect(refundPayment).toHaveBeenCalledTimes(0);
  });

  it("calls refundPayment when next item in paymentQueue is negative", () => {
    generateQueue.mockImplementation(() => [-8]);
    processPayments();

    expect(generateQueue).toHaveBeenCalledTimes(1);

    expect(makePayment).toHaveBeenCalledTimes(0);
    expect(refundPayment).toHaveBeenCalledTimes(1);
  });

  it("calls makePayment when next item in paymentQueue is zero", () => {
    generateQueue.mockImplementation(() => [10]);
    processPayments();

    expect(generateQueue).toHaveBeenCalledTimes(1);

    expect(makePayment).toHaveBeenCalledTimes(1);
    expect(refundPayment).toHaveBeenCalledTimes(0);
  });

  it("handles alernating sequence of positive and negatives", () => {
    generateQueue.mockImplementation(() => [10, -5, 6, -2, 3]);
    processPayments();

    expect(generateQueue).toHaveBeenCalledTimes(1);

    expect(makePayment).toHaveBeenCalledTimes(3);
    expect(refundPayment).toHaveBeenCalledTimes(2);
  });
});
