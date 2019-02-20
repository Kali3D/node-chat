const expect = require("expect");
const {generateMessage} = require("./message");

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