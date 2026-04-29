import type { ReactNode } from "react"
import { cn } from "../../utility/cn"

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode,
    size?: string
}

export const H2 = ({ children, size, ...rest }: H2Props) => {

    const sizeClass = size && `text-${size}`
    return (
        <h2  {...rest} className={cn(
            "text-[#161616] font-bold text-3xl my-5",
            sizeClass
        )}>{children}</h2>
    )
}