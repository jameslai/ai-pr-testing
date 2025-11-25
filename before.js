function ValidateUser(user) {
    return IsValidEmail(user.email) && IsUserRegistered(user.status)
}

function IsValidEmail(email) {
    if (email.length > 30) {
        return false
    }
    if (!email.includes("@")) {
        return false
    }
    return true
}

function IsUserRegistered(status) {
    return status === "registered"
}
