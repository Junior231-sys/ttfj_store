import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // durée de l'animation (en ms)
      once: true, // ne rejoue pas l'animation à chaque scroll
    })
  }, [])

  return <Component {...pageProps} />
}