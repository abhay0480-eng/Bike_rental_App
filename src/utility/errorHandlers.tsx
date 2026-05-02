

export const parseFirebaseError = (error: any): string => {
    if (!error?.code) {
        return "Something went wrong. Please try again."
    }

    const errorMap: Record<string, string> = {
        // Login errors
        'auth/invalid-credential': 'Invalid email or password',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many failed attempts. Try again later.',

        // Signup errors
        'auth/email-already-in-use': 'This email is already registered',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/invalid-email': 'Please enter a valid email address',

        // Network errors
        'auth/network-request-failed': 'Network error. Check your connection.',

        // Other common errors
        'auth/user-disabled': 'This account has been disabled',
        'auth/operation-not-allowed': 'This operation is not allowed',
    }
    return errorMap[error.code] || "Authentication failed. Please try again."
}