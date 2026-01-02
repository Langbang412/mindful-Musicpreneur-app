import { Playfair_Display, Poppins, Raleway } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'sonner'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'The Mindful Musicpreneur® - 360° System for Female Musicians',
  description: 'The first 360° system that merges strategic music career planning with deep shadow work to finally break your sabotaging patterns & step boldly into your spotlight.',
  keywords: 'mindful musicpreneur, female musicians, music career, mindfulness, mental wellness, music industry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${raleway.variable}`}>
      <body className="font-poppins antialiased">
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  )
}