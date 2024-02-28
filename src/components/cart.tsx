import { HandbagSimple, X } from "@phosphor-icons/react/dist/ssr";
import * as Dialog from "@radix-ui/react-dialog";
import { CartContainer, CartFooter, CartItemContainer, CartItemImageContainer } from "../styles/components/cart";
import { useShoppingCart } from "use-shopping-cart";
import Image from 'next/image'
import { useState } from "react";
import axios from "axios";

export function CartComponent(){
    const { totalPrice, cartCount, formattedTotalPrice, cartDetails, removeItem, clearCart  } = useShoppingCart()
    const cartEntry = cartDetails ? Object.keys(cartDetails).map(key => cartDetails[key]) : []

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);


    async function handleBuyProducts() {
        if(cartCount && cartCount> 0){     
            try {
            setIsCreatingCheckoutSession(true);

            const response = await axios.post("/api/checkout", { cartDetails })
                console.log(response)
            
        
             const { checkoutUrl } = response.data;
        
             window.location.href = checkoutUrl;

             clearCart()
            } catch (error) {
            setIsCreatingCheckoutSession(false);
                console.log(error)
            alert("Falha ao redirecionar ao checkout!");
            }
        }
      }

    return (
        <Dialog.Root>
        <Dialog.Trigger asChild> 
          <button>
            <HandbagSimple size={24}/>
            {cartEntry.length > 0 && <span>{cartCount}</span>}
            
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <CartContainer>
        <Dialog.Close asChild>
          <button className="CloseButton" aria-label="Close">
            <X size={24}/>
          </button>
        </Dialog.Close>
        <Dialog.Title>Sacola de compras</Dialog.Title>
        
        <div className="cartItemsWrapper">

            {cartEntry && cartEntry.map( item => 
                (   <CartItemContainer key={item.id}>
                          <CartItemImageContainer>
                            <Image src={item.image ? item.image : ''} alt="" width={94} height={94} />
                          </CartItemImageContainer>
                          <div className="cartItemContent">
                            <h3>{`${item.name} (${item.quantity})`}</h3>
                            <span>{item.formattedValue}</span>
                            <button type='button' onClick={() => removeItem(item.id)}>Remover</button>
                          </div>
                        </CartItemContainer>)
            ) }
        </div>
              
           
        <CartFooter>
          <div>
            <span>Quantidade</span>
            <span>{cartCount} itens</span>
          </div>
          <div>
            <span>Valor total</span>
            <span className="total-value">{formattedTotalPrice}</span>
          </div>
          <button 
            onClick={handleBuyProducts}
            disabled={isCreatingCheckoutSession}
            >
                Finalizar Compra
            </button>
        </CartFooter>

        </CartContainer>
      </Dialog.Content>
    </Dialog.Portal>
        </Dialog.Root>
    )
}