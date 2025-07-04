class OfficeContext {
    constructor() {
        this.selectedEmail = "test@example.com"; // Simulated selected email
    }

    // Simulate getting the selected email from Outlook
    getEmail() {
        return this.selectedEmail;
    }

    // Simulate setting the selected email
    setEmail(email) {
        this.selectedEmail = email;
    }
}

// Export a singleton instance
const officeContext = new OfficeContext();
module.exports = officeContext;
