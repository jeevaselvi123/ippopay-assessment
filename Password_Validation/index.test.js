const { cleanup } = require("@testing-library/react");
const { strongPasswordChecker } = require("./index");

describe("strongPasswordChecker", () => {
  it("should return the steps needed to make it valid", async () => {
    const password = "12345";
    const result = await strongPasswordChecker(password);
    expect(result).toEqual(2);
  });

  it("should return 0 when the password is valid", async () => {
    const password = "Abcdef123456";
    const result = await strongPasswordChecker(password);
    expect(result).toEqual(0);
  });

  it("should return the needed steps to make it valid if consecutive characters occur", async () => {
    const password = "Passsword";
    const result = await strongPasswordChecker(password);
    expect(result).toEqual(1);
  });

  afterEach(() => {
    cleanup;
  });
});
