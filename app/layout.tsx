import {sitePath} from '@/lib/site-path';
import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: { default: 'The Job Talk Field Guide · Benjamin Golub', template: '%s · The Job Talk Field Guide' },
 icons: { icon: sitePath('/favicon.svg') },
 description: 'A gallery of concrete slide and whole-talk repairs, based on Benjamin Golub’s advice on giving a better job talk.',
};
export default function RootLayout({children}: {children: React.ReactNode}) {
 return <html lang="en"><head><link rel="stylesheet" href={sitePath('/math/katex.min.css')} /></head><body><a className="skip" href="#main">Skip to content</a><header className="masthead"><a className="brand" href={sitePath('/')}><span className="brand-mark">↗</span><span>THE JOB TALK<br/><b>FIELD GUIDE</b></span></a><nav aria-label="Main navigation"><a href={sitePath('/')}>Gallery</a><a href={sitePath('/principles')}>The principles</a><a href={sitePath('/essay.html')}>The essay ↗</a><a href={sitePath('/about')}>Sources</a></nav></header>{children}</body></html>
}
