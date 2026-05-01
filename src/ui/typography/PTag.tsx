import type { ReactNode } from "react"
import { cn } from "../../utility/cn"

interface PProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode,
    size?: string,
    color?: string,
    underLine?: string
}

export const Ptag = ({ children, size, color, underLine, ...rest }: PProps) => {

    const sizeClass = size && `text-${size}`
    const colorClass = color && `text-${color}`
    const underLineText = underLine && `underline underline-offset-4`
    return (
        <p  {...rest} className={cn(
            `text-[#161616] font-medium text-base my-3 `,
            sizeClass, colorClass, underLineText
        )}>{children}</p>
    )
}