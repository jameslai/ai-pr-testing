function hello() {
	name = getName()
	console.log("hello world", name)
}

function unused() {
	// Create some space between this function and the last
	console.log("this is an unused function meant to create space")
}

function alsoUnused() {
	return "Meant to be unused as well"
}

function getName() {
	return "jimmy but also bob"
}

function handleUserName(username: string): bool {
	if (username.length > 20) return false
	if (username.contains("thing")) return false
	return true
}
