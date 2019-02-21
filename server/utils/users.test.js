const expect = require("expect");
const {Users} = require("./users");

describe("Users", () => {

	let users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: "1",
			name: "Nico",
			room: "Node course"
		}, {
			id: "2",
			name: "Oliv",
			room: "React course"
		}, {
			id: "3",
			name: "Claude",
			room: "Node course"

		}];
	});

	it("should add new user", () => {
		const user = {id: "4", name: "Nico", room: "Room1"};
		const newUser = users.addUser(user.id, user.name, user.room);
		expect(users.users.length).toBe(4);
		expect(newUser).toMatchObject(user);
	});

	it("should remove a user", () => {
		const removed = users.removeUser("3");
		expect(users.users.length).toBe(2);
		expect(removed.id).toBe("3");
	});

	it("should not remove a user", () => {
		const removed = users.removeUser("5");
		expect(users.users.length).toBe(3);
		expect(removed).toBeFalsy();
	});

	it("should find a user", () => {
		const found = users.getUser("1");
		expect(found).toMatchObject(users.users[0]);
	});

	it("should not find a user", () => {
		const found = users.getUser("5");
		expect(found).toBeFalsy();
	});

	it("should return the correct userList for Node course", () => {
		const userList = users.getUserList("Node course");
		expect(userList.length).toBe(2);
		expect(userList).toEqual(["Nico", "Claude"]);
	});

	it("should return the correct userList for React course", () => {
		const userList = users.getUserList("React course");
		expect(userList.length).toBe(1);
		expect(userList).toEqual(["Oliv"]);
	});
});
