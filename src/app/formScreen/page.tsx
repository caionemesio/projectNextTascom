import { getServerSession } from "next-auth"
import Form from "../components/Form"
import { redirect } from "next/navigation"

export default async function Page(){
    const session= await getServerSession()
    const username= session?.user?.name
    const userEmail= session?.user?.email
    if(!session){
        redirect("/")
    }
    return(
        <Form username={username}  email={userEmail}/>
    )
}