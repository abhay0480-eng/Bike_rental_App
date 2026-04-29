import type { ReactNode } from "react"
import { cn } from "../../utility/cn"

interface PProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode,
    size?: string,
    color?: string
}

export const Ptag = ({ children, size, color, ...rest }: PProps) => {

    const sizeClass = size && `text-${size}`
    const colorClass = color && `text-${color}`
    return (
        <p  {...rest} className={cn(
            `text-[#161616] font-medium text-base my-3`,
            sizeClass, colorClass
        )}>{children}</p>
    )
}