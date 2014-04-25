class Greeter {
	constructor(message) {
		this.message = message;
	}
	greet() {
		let element = document.querySelector('#message');
		element.innerHTML = this.message;
	}
};
let greeter = new Greeter('Hello, world!');
greeter.greet();