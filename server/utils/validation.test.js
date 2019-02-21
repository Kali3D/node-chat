const expect = require("expect");

const {isRealString} = require("./validation");

describe("isRealString", () => {
	it("should reject a non-string value", () => {
		expect(isRealString(5)).toBe(false);
		expect(isRealString({test: "test"})).toBe(false);
	});

	it("should reject strings with only spaces", () => {
		expect(isRealString("   	   ")).toBe(false);
	});

	it("should allow strings with non-space caracters", () => {
		expect(isRealString("   12345  	 ")).toBe(true);
	});
});