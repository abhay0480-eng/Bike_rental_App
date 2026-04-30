import type { ReactNode } from "react"
import { cn } from "../../utility/cn"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    bgBtnColor?: string,
    btnTextColor?: string,
    btnTextSize?: string,
    btnFontWeight?: string,
    btnWidth?: string,
    btnBorder?: string
}


export const Button = ({ children, bgBtnColor, btnTextColor, btnTextSize, btnFontWeight, btnWidth, btnBorder, ...rest }: ButtonProps) => {
    const bgColor = bgBtnColor && `bg-${bgBtnColor}`
    const textColor = btnTextColor && `text-${btnTextColor}`
    const textSize = btnTextSize && `text-${btnTextSize}`
    const fontWeight = btnFontWeight && `font-${btnFontWeight}`
    const width = btnWidth && `w-${btnWidth}`
    const border = btnBorder && `border border-${btnBorder}` 

    return (
        <button {...rest} className={cn(
            "bg-[#FF8C38] text-lg font-bold text-white rounded w-full py-2 px-3 my-5 relative cursor-pointer",
            bgColor, textColor, textSize, fontWeight, width, border
        )}>{children}</button>
    )
}