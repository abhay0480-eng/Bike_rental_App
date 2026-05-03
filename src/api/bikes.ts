import { apiClient } from './client'
import type { Bike } from './type'


export const getAllBikes = async (type?: string): Promise<Bike[]> => {
    const queryParam = type ? `?type=${type}` : ''
    return apiClient<Bike[]>(`/api${queryParam}`)
}

export const getBikeById = async (id: string): Promise<Bike> => {
    const bikes = await apiClient<Bike[]>(`/api/${id}`)
    return bikes[0]  // API returns array, we want the single bike
}

export const getBikesByType = async (type: string): Promise<Bike[]> => {
    return apiClient<Bike[]>(`/api/type/${type}`)
}


export const getBikesByPrice = async (price: number): Promise<Bike[]> => {
    return apiClient<Bike[]>(`/api/price/${price}`)
}


export const getHostBikes = async (hostId: string): Promise<Bike[]> => {
    return apiClient<Bike[]>(`/api/host/bikes/${hostId}`)
}