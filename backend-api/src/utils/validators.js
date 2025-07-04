const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateContact = (contact) => {
    const errors = [];
    
    if (!contact.email || !validateEmail(contact.email)) {
        errors.push('Invalid email address');
    }
    
    if (!contact.full_name || contact.full_name.length < 2) {
        errors.push('Full name must be at least 2 characters');
    }
    
    if (contact.phone_number && !/^\+?\d{10,}$/.test(contact.phone_number)) {
        errors.push('Invalid phone number format');
    }
    
    return errors;
};

module.exports = { validateEmail, validateContact };
