import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { parseFirebaseError } from '../utility/errorHandlers'


interface AuthResult {
    success: boolean
    error?: string
}

export const authService = {

    loginWithEmail: async (email: string, password: string): Promise<AuthResult> => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: parseFirebaseError(error)
            }
        }
    },

    signupWithEmail: async (email: string, password: string): Promise<AuthResult> => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: parseFirebaseError(error)
            }
        }
    },

    logout: async (): Promise<AuthResult> => {
        try {
            await signOut(auth)
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: parseFirebaseError(error)
            }
        }
    }
}