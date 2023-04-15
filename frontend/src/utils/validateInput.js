const validateInput = (inputData) => {
    const email = inputData['email'];
    const username = inputData['username'];
    const password = inputData['password'];
    const confirmPassword = inputData['confirmPassword'];

    let errors = [];

    if (email !== undefined) {
        if (!email.includes('@')) errors.push('Please enter a valid email');
        if (!email.length) errors.push('Please enter the email');
        if (email.length > 255)
            errors.push('Email cannot be more than 255 characters');
    }

    if (password !== undefined) {
        if (password.length < 6)
            errors.push('Password must be at least 6 characters');
        if (!password.length) errors.push('Please enter your password');
    }

    if (username !== undefined) {
        if (!username.length) errors.push('Please enter a username');
        if (username.length > 255)
            errors.push('Username cannot be more than 255 characters');
    }

    if (confirmPassword !== undefined) {
        if (confirmPassword !== password) {
            errors.push('Password entered is not matching');
        }
    }

    return errors;
};
export default validateInput;
