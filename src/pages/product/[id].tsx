import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { useRouter } from "next/router"




export default function Product(){
    const { query } = useRouter()
    return <ProductContainer>
        
        <ImageContainer>

        </ImageContainer>

        <ProductDetails>
            <h1>Camiseta X</h1>
            <span>R$ 79,90</span>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta consectetur doloribus nulla, molestias odio delectus. Cumque corrupti corporis fugiat odit amet sit dolores, eum est incidunt ratione quis eius ducimus.</p>

            <button>
                Comprar agora
            </button>
        </ProductDetails>
        
        </ProductContainer>
}