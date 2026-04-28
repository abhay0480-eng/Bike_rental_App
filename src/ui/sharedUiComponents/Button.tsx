import type { ReactNode } from "react"

interface ButtonProps {
    children: ReactNode
}

export const Button = ({ children }: ButtonProps) => {
    return (
        <button className="bg-[#FFEAD0] w-2xs  px-3 py-2 rounded text-[#4D4D4D] text-base font-medium">{children}</button>
    )
}