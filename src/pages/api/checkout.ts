import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res: NextApiResponse){
    const { cartDetails }= req.body
    const itemsList = cartDetails ? Object.keys(cartDetails).map(key => (
         { price: cartDetails[key].price_id, quantity: cartDetails[key].quantity})) : []
    
    console.log(itemsList)
    if(req.method !== 'POST'){
        return res.status(405)
    }

    if(!itemsList) {
        return res.status(400).json({ error: 'Cart itens not found.'})
    }
    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}/`
    
    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: itemsList
    })

    
    return res.status(201).json({
        checkoutUrl: checkoutSession.url,
    })
}