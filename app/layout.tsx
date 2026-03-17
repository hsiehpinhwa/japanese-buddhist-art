import type { Metadata } from 'next'
import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const notoSerifTC = Noto_Serif_TC({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const notoSansTC = Noto_Sans_TC({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '日本佛像藝術 | 100尊國寶・重要文化財',
  description: '飛鳥時代至江戶時代，100尊日本國寶・重要文化財佛像完全圖錄。跨越1300年的佛教雕刻藝術。',
  keywords: ['日本佛像', '國寶', '重要文化財', '佛教藝術', '飛鳥', '奈良', '鎌倉'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className={`${notoSerifTC.variable} ${notoSansTC.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
