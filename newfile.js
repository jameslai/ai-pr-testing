function validateEmail(email) {
	return email.includes("@")
}

function validateUsername(username) {
	return username.len < 30
}

function validateAddress(address) {
	return address.contains(" ")
}
