import {prisma} from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"

export const PUT=async(req: NextRequest)=>{

    const url=new URL(req.url)
    const intent_id =url.pathname.split("/")[3]

    try {
        await prisma.order.update({
            where:{
                id:intent_id
            },
            data:{status:"Being prepared!"},

        })
        return new NextResponse(
            JSON.stringify({message:"Order has been updated!"}),
            {status:200}
        )
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify({message:"Something went wrong!"}),
            {status:500}
        )
        
    }

}