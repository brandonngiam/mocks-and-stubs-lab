const math = require("mathjs");
const generateQueue = require("../src/queueService");

const mockRandInt = jest.spyOn(math, "randomInt");
const iterations = 1000;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("generateQueue", () => {
  it("should always generate arrays of length between and inclusive of 1-9", () => {
    for (let i = 0; i < iterations; i++) {
      let queue = generateQueue();
      expect(mockRandInt).toBeCalled();
      expect(queue.length).toBeGreaterThanOrEqual(1);
      expect(queue.length).toBeLessThanOrEqual(9);
    }
  });

  it("given a fixed array length of 5, it should return arrays between and inclusive of -20-49", () => {
    for (let i = 0; i < iterations * 10; i++) {
      mockRandInt.mockImplementationOnce(() => 5);
      let queue = generateQueue();
      expect(mockRandInt).toBeCalled();
      expect(queue.length).toEqual(5);
      expect(Math.max(...queue)).toBeLessThanOrEqual(49);
      expect(Math.min(...queue)).toBeGreaterThanOrEqual(-20);
    }
  });
});
