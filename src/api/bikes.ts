import { apiClient } from './client'
import type { Bike } from './type'

/**
 * Bike API functions
 * All bike-related API calls in one place
 */

/**
 * Get all bikes with optional type filter
 * PUBLIC ENDPOINT - No auth required
 */
export const getAllBikes = async (type?: string): Promise<Bike[]> => {
    const queryParam = type ? `?type=${type}` : ''
    return apiClient<Bike[]>(`/api${queryParam}`, false)  // ✅ false = no auth
}

/**
 * Get a single bike by ID
 * PUBLIC ENDPOINT - No auth required
 */
export const getBikeById = async (id: string): Promise<Bike> => {
    const bikes = await apiClient<Bike[]>(`/api/${id}`, false)  // ✅ false = no auth
    return bikes[0]
}

/**
 * Get bikes filtered by type (using path parameter)
 * PUBLIC ENDPOINT - No auth required
 */
export const getBikesByType = async (type: string): Promise<Bike[]> => {
    return apiClient<Bike[]>(`/api/type/${type}`, false)  // ✅ false = no auth
}

/**
 * Get bikes filtered by price (using path parameter)
 * PUBLIC ENDPOINT - No auth required
 */
export const getBikesByPrice = async (price: number): Promise<Bike[]> => {
    return apiClient<Bike[]>(`/api/price/${price}`, false)  // ✅ false = no auth
}

/**
 * Get all bikes for the currently authenticated host
 * PROTECTED ENDPOINT - Requires auth
 * 
 * Note: No hostId parameter needed! Backend extracts user ID from auth token.
 */
export const getHostBikes = async (): Promise<Bike[]> => {
    return apiClient<Bike[]>('/api/host/bikes', true)  // ✅ true = requires auth
}