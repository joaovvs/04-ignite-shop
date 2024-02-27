import { GetStaticProps } from "next"

import Head from 'next/head'
import Image from "next/image"

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "../lib/stripe"

import { HomeContainer, ProductHomeContainer } from "../styles/pages/home"



import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import Link from "next/link"
import { useEffect, useState } from "react"


interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string
    description: string,
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [mounted, setMounted] = useState(false)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    
  })


  useEffect(() => {
    setMounted(true)
  },[])


  if(!mounted){
    return null
  }

  return (
    <>
      <Head>
          <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">      
        {products.map(product => {
        return ( 
          <Link key={product.id} href={`/product/${product.id}`} prefetch={false} >
            <ProductHomeContainer className="keen-slider__slide"> 
              <Image src={product.imageUrl} alt="" width={520} height={480} priority={true}/>
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
              </ProductHomeContainer>
          </Link>

        )})}

      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      description: product.description,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount ? price.unit_amount / 100: 0)
    }
  })
  
  return {
    props: {
      products,
  },
  revalidate: 60 * 60 * 2, // 2 hours
}
}