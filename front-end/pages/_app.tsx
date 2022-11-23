import type { AppProps } from 'next/app'
import { CSSReset } from '../styles/CSSReset';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CSSReset />
      <Component {...pageProps} />
    </>
  )
}
