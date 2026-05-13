import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode

    fallback: ReactNode

}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null
        }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Vroom Error:", error.message)
        console.error("Component:", errorInfo.componentStack)

    }

    render() {
        if (this.state.hasError) {

            // If parent passed custom fallback — use it
            if (this.props.fallback) return this.props.fallback

            // Default fallback — matches Vrooom design
            return (
                <div className="flex flex-col items-center justify-center
                        p-8 rounded-2xl bg-red-50 border border-red-100
                        text-center my-4">

                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center
                          justify-center mb-4 text-2xl">
                        ⚠️
                    </div>

                    <p className="font-bold text-slate-800 text-base">
                        Something went wrong
                    </p>

                    <p className="text-slate-500 text-sm mt-1 mb-4 max-w-xs">
                        {this.state.error?.message || "An unexpected error occurred"}
                    </p>

                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="inline-flex items-center gap-2 bg-orange-500
                       hover:bg-orange-400 text-white font-semibold
                       text-sm px-5 py-2.5 rounded-xl transition-colors
                       duration-200 cursor-pointer"
                    >
                        Try again
                    </button>

                </div>
            )
        }

        return this.props.children
    }
} 