import type { ReactNode } from "react"
import { cn } from "../../utility/cn"

interface ButtonProps {
    children: ReactNode,
    bgBtnColor?: string,
    btnTextColor?: string,
    btnTextSize?: string,
    btnFontWeight?: string,
    btnWidth?: string

}


export const Button = ({ children, bgBtnColor, btnTextColor, btnTextSize, btnFontWeight, btnWidth, ...rest }: ButtonProps) => {
    const bgColor = bgBtnColor && `bg-${bgBtnColor}`
    const textColor = btnTextColor && `text-${btnTextColor}`
    const textSize = btnTextSize && `text-${btnTextSize}`
    const fontWeight = btnFontWeight && `font-${btnFontWeight}`
    const width = btnWidth && `w-${btnWidth}`

    return (
        <button {...rest} className={cn(
            "bg-[#FF8C38] text-lg font-bold text-white rounded w-full py-2 px-3 my-5 relative",
            bgColor, textColor, textSize, fontWeight, width
        )}>{children}</button>
    )
}