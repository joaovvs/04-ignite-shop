import { stripe } from "@/src/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/src/styles/pages/product";
import Head from "next/head";
import Image from "next/image";

import { GetStaticPaths, GetStaticProps } from "next/types";

import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface ProductProps {
  product: {
    id: string;
    name: string;
    image: string;
    currency: string;
    description: string;
    price: number;
    price_id: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()


  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.image} alt="" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{(product.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</span>

          <p>{product.description}</p>

          <button
            type="button"
            onClick={() => addItem(product)}

          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_PdSlpzJL7S7Oxg" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params ? params.id : "";

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        image: product.images[0],
        currency: 'BRL',
        description: product.description,
        price: price.unit_amount ? price.unit_amount : 0,
        price_id: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
