const math = require("mathjs");
const generateQueue = require("../src/queueService");

const mockRandInt = jest.spyOn(math, "randomInt");
const iterations = 1000;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("generateQueue", () => {
  it("should return random length array of elements within a range", () => {
    mockRandInt.mockReturnValueOnce(5);
    mockRandInt.mockReturnValueOnce(-5);
    mockRandInt.mockReturnValueOnce(-1);
    mockRandInt.mockReturnValueOnce(0);
    mockRandInt.mockReturnValueOnce(1);
    mockRandInt.mockReturnValueOnce(7);

    expect(generateQueue()).toEqual([-5, -1, 0, 1, 7]);
  });
});
