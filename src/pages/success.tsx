import Link from "next/link";
import Image from "next/image";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string
  quantity: number
  products: {
    id: string
    name: string
    images: string[]
  }[]
}

export default function Success({ customerName, products, quantity}: SuccessProps){

    return (
        <SuccessContainer>
            <h1>Compra efetuada!</h1>
            <div>
            {products.map(product => (
                <ImageContainer key={product.id}>
                  <Image src={product.images[0]} alt="" width={130} height={142} />
                </ImageContainer>
            ))}
            </div>

            <p>
                Uhuuul <strong>{customerName}</strong>, sua compra de {quantity} <strong>camiseta(s)</strong> já está a caminho da sua casa.
            </p>


            <Link href="/">
                Voltar ao catálogo
            </Link>
        </SuccessContainer>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })
    const customerName = session.customer_details?.name
    const quantity = session.line_items?.data.reduce(function(accumulator, object){
        return accumulator + (object.quantity ? object.quantity : 0)
    },0)

    const products = session.line_items?.data.map(item =>  item.price?.product)  as Stripe.Product[]
    
    return {
        props: {
            customerName,
            products,
            quantity,
        }
    }
}