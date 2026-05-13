import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        // Custom fallback for full app crash
        // Styled to match Vrooom even when everything else fails
        <div className="flex flex-col items-center justify-center
                        min-h-screen bg-[#FFF7ED] text-center px-6">

          <div className="text-5xl mb-4">🏍️</div>

          <h1 className="text-2xl font-extrabold text-slate-800 mb-2">
            Vrooom hit a bump
          </h1>

          <p className="text-slate-500 text-sm max-w-sm mb-6">
            Something unexpected happened. Try refreshing the page.
          </p>

          <button
            onClick={() => window.location.reload()}
            // Full app crashed — can't reset React state
            // Best option is page reload
            className="bg-orange-500 hover:bg-orange-400 text-white
                       font-bold px-6 py-3 rounded-xl transition-colors
                       duration-200 cursor-pointer"
          >
            Refresh page
          </button>

        </div>
      }
    >
    <AuthProvider>
      <App />
    </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
