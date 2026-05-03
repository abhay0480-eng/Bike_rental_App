/**
 * Core data types for the Bike Rental API
 * Single source of truth for all bike-related interfaces
 */

/**
 * Bike type categories
 */
export type BikeType = 'simple' | 'rugged' | 'luxury'

/**
 * Complete bike data structure from the API
 */
export interface Bike {
    id: string
    name: string
    imageUrl: string
    price: number
    type: BikeType
    description: string
    hostId?: string
    hostedBy?: string
}

/**
 * Generic API response wrapper for future error handling
 * Can be used for any API endpoint that returns data
 */
export interface ApiResponse<T> {
    data: T | null
    error: string | null
}