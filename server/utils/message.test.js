const expect = require("expect");
const {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
	it("shoud generate the correct message object", () => {
		const from = "Nico";
		const text = "Hi there !";
		const message = generateMessage(from, text);
		expect(message.from).toBe(from);
		expect(message.text).toBe(text);
		expect(message).toMatchObject({from, text});
		expect(typeof message.createdAt).toBe("number");
	});
});

describe("generateLocationMessage", () => {
	it("should generate correct location object", () => {
		const from = "Nico";
		const latitude = "1";
		const longitude = "-1";
		const url = "https://www.google.com/maps?q=1,-1";
		const message = generateLocationMessage(from, latitude, longitude);
		expect(message).toMatchObject({from, url});
		expect(typeof message.createdAt).toBe("number");
	});
});