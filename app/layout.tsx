import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bunker91',
  description: 'Designs para seu estabelecimento',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        {/* Fundo */}
        <div className="fixed inset-0 -z-10">
          <div className="h-full w-full bg-bunker-fundo bg-cover bg-center bg-fixed brightness-75 backdrop-blur-sm" />
        </div>

        {/* Conteúdo acima do fundo */}
        <main className="relative z-10 min-h-screen">{children}</main>
      </body>
    </html>
  )
}
