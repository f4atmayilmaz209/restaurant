"use client"
import {useQuery, useQueryClient} from "@tanstack/react-query"
import { OrderType } from "@/types/types"
import {useSession} from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";

const OrdersPage = () => {

  const {data:session,status}=useSession()
  const router=useRouter()
  if(status==="unauthenticated"){
    router.push("/")
  }
  const {isLoading,error,data}=useQuery({
    
    queryKey:['orders'],
    queryFn:()=>
      fetch('http://localhost:3000/api/orders').then(
        (res)=>res.json(),
      )
  })

  const queryClient=useQueryClient()
  const mutation=useMutation({
    mutationFn:({id,status}:{id:string,status:string})=>{
      return fetch(`http://localhost:3000/api/orders/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(status),
      })
    },
    onSuccess(){
      queryClient.invalidateQueries({queryKey:["orders"]});

    }
  })

  const handleUpdate=(e:React.FormEvent<HTMLFormElement>,id:string)=>{
    e.preventDefault()
    const form=e.target as HTMLFormElement
    const input=form.elements[0] as HTMLInputElement
    const status=input.value
    mutation.mutate({id,status})
    toast.success("the order status has been changed")
  }
  if(isLoading || status==="loading") return "Loading ..."
  return (
    <div className='p-4 lg:px-20 xl:px-40'>
      <table className='w-full border-separate'>
        <thead>
          <tr className='text-left'>
            <th className='hidden md:block'>Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className='hidden md:block'>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item:OrderType)=>(
            <tr key={item.id} className={`${item.status!=="delivered" && "bg-red-100"}`}>
              <td className='hidden md:block py-6 px-1'>{item.id}</td>
              <td className='py-6 px-1'>{item.createdAt.toString().slice(0,10)}</td>
              <td className='py-6 px-1'>{item.price}</td>
              <td className='hidden md:block py-6 px-1'>{item.products[0].title}</td>
              <td className='py-6 px-1'>{item.status}</td>
              {session?.user.isAdmin ? (
                <td>
                  <form className="flex items-center justify-center gap-4" onSubmit={(e)=>handleUpdate(e,item.id)}>
                    <input className="p-2 ring-1 ring-red-100 rounded-md" placeholder={item.status}></input>
                    <button className="bg-red-400 p-2 rounded-full">
                      <Image src="/edit.png" alt="" width={20} height={20}/>
                    </button>
                  </form>

                </td>
                ):(
                <td className="py-6 px-1">{item.status}</td>
              )}
            </tr>

          ))}


        </tbody>
      </table>
    </div>
  )
}

export default OrdersPage
