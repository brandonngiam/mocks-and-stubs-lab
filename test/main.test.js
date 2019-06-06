const processPayments = require("../src/main");
const paymentService = require("../src/paymentService");
const generateQueue = require("../src/queueService");

jest.mock("../src/queueService");
const spyPayment = jest.spyOn(paymentService, "makePayment");
const spyRefund = jest.spyOn(paymentService, "refundPayment");

describe("processing Payments", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("does not call makePayment or refundPayment when paymentQueue is empty", () => {
    generateQueue.mockReturnValue([]);
    processPayments();

    expect(spyPayment).not.toHaveBeenCalled();
    expect(spyRefund).not.toHaveBeenCalled();
  });

  it("calls makePayment when next item in paymentQueue is positive", () => {
    //test boundary condition
    generateQueue.mockReturnValue([1]);
    processPayments();

    expect(spyPayment).toHaveBeenCalledWith(1);
    expect(spyRefund).not.toHaveBeenCalled();
  });

  it("calls refundPayment when next item in paymentQueue is negative", () => {
    //test boundary condition
    generateQueue.mockReturnValue([-1]);
    processPayments();

    expect(spyPayment).not.toHaveBeenCalled();
    expect(spyRefund).toHaveBeenCalledWith(-1);
  });

  it("calls makePayment when next item in paymentQueue is zero", () => {
    generateQueue.mockReturnValue([0]);
    processPayments();

    expect(spyPayment).toHaveBeenCalledWith(0);
    expect(spyRefund).not.toHaveBeenCalled();
  });

  it("handles alernating sequence of positive and negatives", () => {
    generateQueue.mockReturnValue([1, -1, 2, -2, 3]);
    processPayments();

    expect(spyPayment).toHaveBeenCalledTimes(3);
    expect(spyPayment).toHaveBeenCalledWith(1);
    expect(spyPayment).toHaveBeenCalledWith(2);
    expect(spyPayment).toHaveBeenCalledWith(3);
    expect(spyRefund).toHaveBeenCalledTimes(2);
    expect(spyRefund).toHaveBeenCalledWith(-1);
    expect(spyRefund).toHaveBeenCalledWith(-2);
  });
});
