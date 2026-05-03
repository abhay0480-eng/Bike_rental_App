
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bike-rental-server-srsy.onrender.com'

export const apiClient = async <T>(endpoint: string): Promise<T> => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`)


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}