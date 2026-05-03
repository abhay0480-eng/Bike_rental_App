import { auth } from "../config/firebase"


// Base URL for your backend API
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bike-rental-server-srsy.onrender.com'

/**
 * Generic API client function with auth token support
 * Automatically includes Firebase auth token for authenticated requests
 * 
 * @param endpoint - API endpoint (e.g., '/api/bikes' or '/api/host/bikes')
 * @param requiresAuth - Whether this endpoint requires authentication (default: false)
 * @returns Parsed JSON response
 * @throws Error if the request fails
 */
export const apiClient = async <T>(
    endpoint: string,
    requiresAuth: boolean = false
): Promise<T> => {
    try {
        // Prepare headers
        const headers: HeadersInit = {
            'Content-Type': 'application/json'
        }

        // If endpoint requires auth, get token and add to headers
        if (requiresAuth) {
            const currentUser = auth.currentUser

            if (!currentUser) {
                throw new Error('User not authenticated')
            }

            // Get fresh Firebase ID token
            const token = await currentUser.getIdToken()
            headers['Authorization'] = `Bearer ${token}`
        }

        // Make the request
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers
        })

        // Check if response is OK (status 200-299)
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized - Please login again')
            }
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}