import Image from "next/image"

import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, ProductContainer } from "../styles/pages/home"

import camiseta1 from '../assets/1.png'
import camiseta2 from '../assets/2.png'
import camiseta3 from '../assets/3.png'
import camiseta4 from '../assets/4.png'

import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    
  })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">

      <ProductContainer className="keen-slider__slide"> 
        <Image src={camiseta1} alt="" width={520} height={480}/>

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,98</span>
        </footer>
      </ProductContainer>
      <ProductContainer className="keen-slider__slide"> 
        <Image src={camiseta2} alt="" width={520} height={480}/>

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,98</span>
        </footer>
      </ProductContainer>
      <ProductContainer className="keen-slider__slide"> 
        <Image src={camiseta3} alt="" width={520} height={480}/>

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,98</span>
        </footer>
      </ProductContainer>
      <ProductContainer className="keen-slider__slide"> 
        <Image src={camiseta4} alt="" width={520} height={480}/>

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,98</span>
        </footer>
      </ProductContainer>


    </HomeContainer>
  )
}
