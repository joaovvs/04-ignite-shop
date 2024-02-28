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
import { CaretLeft, CaretRight, HandbagSimple } from "@phosphor-icons/react/dist/ssr"
import { useShoppingCart } from "use-shopping-cart"
import { Product } from "use-shopping-cart/core"


interface HomeProps {
  products: {
    id: string,
    sku: string,
    name: string,
    image: string
    description: string,
    price: number
    currency: string,
    price_id: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addItem }  = useShoppingCart()
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  function handleAddToCart(product: Product, event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    event.stopPropagation();
    addItem(product);
  }

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
            <ProductHomeContainer key={product.id} className="keen-slider__slide"> 
              <Link  href={`/product/${product.id}`} prefetch={false} >
                <Image src={product.image} alt="" width={520} height={480} priority={true}/>
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{(product.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</span>
                </div>
                <button onClick={(e: any) => handleAddToCart(product, e)}>
                  <HandbagSimple size={32}/>
                </button>
              </footer>
              </ProductHomeContainer>
          

        )})}
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 3
              }
            />
          </>
        )}

      </HomeContainer>
    </>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"} ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      {props.left && (
        <CaretLeft size={48}/>
      )}
      {!props.left && (
        <CaretRight size={48}/>
      )}
    </svg>
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
      sku: product.id,
      name: product.name,
      currency: 'BRL',
      image: product.images[0],
      description: product.description,
      price: price.unit_amount ? price.unit_amount : 0,
      price_id: price.id
    }
  })
  
  return {
    props: {
      products,
  },
  revalidate: 60 * 60 * 2, // 2 hours
}
}