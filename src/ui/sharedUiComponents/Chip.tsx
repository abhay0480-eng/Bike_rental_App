import type { ReactNode } from "react"
import { cn } from "../../utility/cn"

interface ChipsProps {
    children: ReactNode,
    variant?: string

}


export const Chip = ({ children, variant, ...rest }: ChipsProps) => {

    const variantObj = {
        simple: "bg-[#E17654]",
        rugged: "bg-[#115E59]",
        luxury: "bg-[#161616]"
    }

    const choosenVariant = variantObj[variant?.toLowerCase()]


    return (
        <button {...rest} className={cn(
            "text-base, font-semibold text-[#FFEAD0] w-56 py-2 px-3 rounded",
            choosenVariant
        )}>{children}</button>
    )
}