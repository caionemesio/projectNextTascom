"use client"

import {TextField,Stack,Autocomplete,Button} from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import {useState } from 'react'
import {z} from 'zod'
import { getChampions } from '../api/campeoes'
import { useQuery } from 'react-query'
import { useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {format} from "date-fns"
import { signOut } from 'next-auth/react'
import { validNickName } from '../api/validNickName'

const userSchema= z.object({
    nickname: z.string().min(3, "Enter a valid name!"),
    tagline:z.string().min(1,"Enter a valid tagname"),
    phoneNumber: z.string().min(4, "This field is required"),
    champion: z.string().min(1, "Select a champion"),  
    
}) 
type userSchema= z.infer<typeof userSchema>
type formProps={
    username:string | null | undefined,
    email:string | null | undefined,
}
export default  function Form( {username,email}:formProps){
    const {data, isLoading, isError}=useQuery(["champions"],getChampions)
    const [phone, setPhone] = useState<string>("")
    const [notFoundPlayer,setNotFoundPlayer]=useState<boolean>(false)
    const {register, handleSubmit, formState:{errors}}=useForm<userSchema>({
        resolver:zodResolver(userSchema)
    })

    const handleChange = (newPhone:string) => {
      setPhone(newPhone)
    }

   async function handleRegisterUser(dataUser:userSchema){
        const formattedDate=format(new Date(),"dd/MM/yyyy")
        const formattedTagline= dataUser.tagline.slice(1)
        try {
            const validationNickname= await validNickName({summonerName:dataUser.nickname, tagline:formattedTagline})
            if(validationNickname==='playerFound'){
                const newUserData= {...dataUser, username,email,formattedDate,formattedTagline}
                console.log(newUserData)
                return newUserData
            }else if(validationNickname==='playerNotFound'){
                setNotFoundPlayer(true)
                return
            }
        } catch (error) {
            console.error(error)
        }


        
        
    }

    if(isLoading){
       return <h2>carregando...</h2>
    }
    if(isError){
        return <h3>Algo deu errado :/</h3>
    } 
    // console.log(data)
    return(
        <div className="pt-6 flex flex-col gap-4 justify-center items-center">
            <h1 className='text-lg'>Register for the monoChampions battle </h1>
            <form onSubmit={handleSubmit(handleRegisterUser)}>
            <Stack spacing={2} width={350} color={"GrayText"}>
            <div >
                <TextField label="Nickname" className='w-2/3' onFocus={()=>setNotFoundPlayer(false)} type='text'  {...register('nickname')} />
                <TextField label="tagline"className='w-1/3' defaultValue="#" type='text' {...register('tagline')}/>
                 {errors.nickname && (<p className='text-red-700'>{errors.nickname.message}</p>)}   
                {notFoundPlayer &&(<p className='text-red-700'>Player not found!</p>)}
            </div>  
           
            <div>
            <MuiTelInput label="Phone Number"
             {...register('phoneNumber')}
             value={phone} 
             className='w-full'
             onChange={handleChange}
             defaultCountry="BR"
             />
             {errors.phoneNumber && (<p className='text-red-700'>{errors.phoneNumber.message}</p>)}
            </div>
             <div>
             {data&&<Autocomplete 
                id='combo-box-demo'
                options={data}
                className='w-full'
                sx={{width:350}}
                renderInput={(champion)=><TextField
                      {...champion} 
                      {...register('champion')}
                      label="Champion"/>}
                
             />}
            {errors.champion && (<p className='text-red-700'>{errors.champion.message}</p>)} 
             </div>
            <Button type='submit' variant='contained'>Enviar</Button>
            <Button onClick={()=>signOut()}  variant='text' color='error'  size='small'>Log Out</Button>
            </Stack>     
            </form>
        </div>
    )
}