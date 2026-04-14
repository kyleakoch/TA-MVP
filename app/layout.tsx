import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "That's Available",
  description: 'Naming preflight tool for domains and brand signal.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="mx-auto mt-12 max-w-6xl border-t border-slate-800 px-4 py-6 text-xs text-slate-400">
          <div className="flex items-center justify-between">
            <span>© {new Date().getFullYear()} That&apos;s Available</span>
            <span>Version B</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
