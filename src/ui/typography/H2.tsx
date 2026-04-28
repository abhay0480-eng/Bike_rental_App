import type { ReactNode } from "react"

interface H2Props {
    children: ReactNode
}

export const H2 = ({ children }: H2Props) => {
    return (
        <h2 className="text-[#161616] font-bold text-3xl">{children}</h2>
    )
}