import type { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { CartProvider } from 'use-shopping-cart'

import logoImg from '../assets/logo.svg'
import { Container, Header } from "../styles/pages/app"
import Image from "next/image"
import { CartComponent } from "../components/cart"

globalStyles()
const stripeKey = process.env.STRIPE_PUBLIC_KEY

export default function App({ Component, pageProps }: AppProps) { 

  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey ? stripeKey : "" }
      currency="BRL"
      allowedCountries={['BR']}
      billingAddressCollection={false}
      successUrl={`${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
      cancelUrl={`${process.env.NEXT_URL}`}
      shouldPersist={true}
    >
    <Container>
      <Header>
        <Image src={logoImg} alt="" width={130} height={52} priority={true} />
        <CartComponent />
      </Header>

      <Component {...pageProps} />

     

      
    </Container>
    </CartProvider>
  )
}
