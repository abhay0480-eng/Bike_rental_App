import { useState } from "react"
import { useAuth } from "../context/AuthContext.js"

type FormErrors = {
    email?: string,
    password?: string,
    confirmPassword?: string,
    phone?: string,
    fullName?: string,
    city?: string,
}

type UserRole = "host" | "renter"
export const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        city: "",
        role: "" as UserRole | ""
    })
    const { signup, authError, clearAuthError } = useAuth()
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors: FormErrors = {}
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 charaters"
        }

        if (!formData.confirmPassword) {
            newErrors.password = "Confirm Password is required"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.password = "Password dont match"
        }

        if (!formData.fullName) {
            newErrors.fullName = "Full name is required"
        }

        if (!formData.city) {
            newErrors.city = "City is required"
        }

        if (formData.role === "host" && !formData.city) {
            newErrors.city = "City is required for hosts"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0


    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(pre => ({
            ...pre,
            [name]: value
        }))
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) {
            return
        }

        try {
            const success = await signup(formData.email, formData.password)
            if (!success) {
                return
            }
        } catch (error) {

        }
        console.log("formData", formData)
    }
    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Enter confirm password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Enter Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Enter Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Enter City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}