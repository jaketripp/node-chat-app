class Users {
	constructor () {
		this.users = [];
	}
	addUser (id, name, room) {
		var user = {id, name, room};
		this.users.push(user);

		return user;
	}
	removeUser (id) {
		var user = this.getUser(id);
		
		if (user) {
			this.users = this.users.filter((user) => user.id !== id);			
		}
		return user;
	}
	getUser (id) {
		return this.users.filter((user) => user.id === id)[0];
	}
	getUserList (room) {
		return this.users.filter((user) => user.room === room).map((user) => user.name);
	}
	getRoomList () {
		return this.users.map((user) => user.room);
	}
	// checks that no other user in the chat room has the same name
	isUserUnique (params) {
		var roomUsers = this.getUserList(params.room) || [];
		if (roomUsers.length > 0) {
			return roomUsers.filter((username) => username.toLowerCase() === params.name.toLowerCase()).length === 0;
		} else {
			return true;
		}
	}
}

module.exports = {Users};

// addUser(id, name, room)
// removeUser(id)
// getUser(id) return object
// getUserList(room) return all users in room

// class Person {
// 	constructor (name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}
// 	getUserDescription () {
// 		return `${this.name} is ${this.age} year(s) old.`;
// 	}
// }

// var me = new Person('Jake', 21);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
// var description = me.getUserDescription();
// console.log(description);

