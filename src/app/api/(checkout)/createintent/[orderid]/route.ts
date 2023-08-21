const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)
import {prisma} from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req: NextRequest)=>{

    const url=new URL(req.url)
    const orderid =url.pathname.split("/")[3]
    const order=await prisma.order.findUnique({
        where:{
           id:orderid,
        }
    })

    
    if(order){

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100 * 100,
            currency: "gbp",
            automatic_payment_methods: {
              enabled: true,
            },
        });
        await prisma.order.update({
            where:{
                id:orderid?.toString()
            },
            data:{intent_id:paymentIntent.id},
        })
        return new NextResponse(JSON.stringify({clientSecret:paymentIntent.client_secret}),{status:200})

    }else{
        return new NextResponse(JSON.stringify({message:"Order not found"}),{status:404})
    }

}