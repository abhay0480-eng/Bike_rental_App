import { useState } from "react"
import { Button } from "../ui/sharedUiComponents/Button"
import { H2 } from "../ui/typography/H2"
import { Ptag } from "../ui/typography/PTag"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router"

type FormErrors = {
    email?: string;
    password?: string;
    api?: string; // for API errors later
}

export const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState<FormErrors>({})
    const [isLoading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()     

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(pre => ({ ...pre, [event.target.name]: event.target.value }))
        if (error[event.target.name as keyof FormErrors]) {
            setError(prev => {
                const newError = { ...prev }
                delete newError[event.target.name as keyof FormErrors]
                return newError
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError({})

        const newErrors: FormErrors = {}
        if (!formData.email) {
            newErrors.email = "Email is required"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors)
            return
        }
        console.log(formData)

        try {
            setLoading(true)
            await login(formData.email, formData.password)
            navigate('/host')
        } catch (err) {
            console.log(err)

            let errorMessage = "Failed to login. Please try again."

            if (err.code === 'auth/invalid-credential') {
                errorMessage = "Invalid email or password"
            } else if (err.code === 'auth/user-not-found') {
                errorMessage = "No account found with this email"
            } else if (err.code === 'auth/wrong-password') {
                errorMessage = "Incorrect password"
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = "Too many failed attempts. Try again later."
            }

            setError({ api: errorMessage })
        } finally {
            setLoading(false)
        }
    }
    console.log(error)
    return (
        <div className=" w-full  flex justify-center items-center">
            <div className="p-5 w-full rounded text-center">
                <H2>Sign in to your account</H2>
                {error.api && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error.api}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="rounded text-left">
                        <input
                            className="px-3 py-3 w-full  border border-[#D1D5DB] bg-[#FFF7ED] outline-[#FF8C38]" type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Please enter your Email"
                            onChange={handleInput}
                            disabled={isLoading}
                        />
                        {error?.email && <div className="text-base text-red-400 my-1 ">{error?.email}</div>}
                        <input
                            className="px-3 py-3 w-full border border-[#D1D5DB]  bg-[#FFF7ED] border-t outline-[#FF8C38]  border-t-[#D1D5DB] "
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder="Please enter your Password"
                            onChange={handleInput}
                            disabled={isLoading}
                        />
                        {error.password && <div className="text-base text-red-400 my-1 ">{error.password}</div>}
                    </div>

                    <Button type="submit">{isLoading ? 'Sigining in ...' : "Sign in"}</Button>
                </form>




                <Ptag>Don’t have an account? <span className="text-[#FF8C38]">Create one now</span></Ptag>

            </div>
        </div>
    )
}