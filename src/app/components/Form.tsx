"use client"

import {TextField,Stack,Autocomplete,Button} from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import {useState } from 'react'
import {z} from 'zod'
import { getChampions } from '../api/campeoes'
import { useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const userSchema= z.object({
    name:z.string().min(2),
    email:z.string(),
    phoneNumber:z.string(),
    champion:z.string()
}) 
type userSchema= z.infer<typeof userSchema>
export default  function Form(){
    const {data, isLoading, isError}=useQuery(["champions"],getChampions)
    const [phone, setPhone] = useState<string>("")
    const {register, handleSubmit}=useForm<userSchema>({
        resolver:zodResolver(userSchema)
    })

    const handleChange = (newPhone:string) => {
      setPhone(newPhone)
    }

    function handleRegisterUser(dataUser:userSchema){
        console.log(dataUser)
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
            <TextField label="name" type='text'  {...register('name')}/>
            <TextField label="email" type='email'  {...register('email')}/>
            <MuiTelInput label="Telefone"
             {...register('phoneNumber')}
             required
             value={phone} 
             onChange={handleChange}
             defaultCountry="BR"
             />
             {data&&<Autocomplete 
                id='combo-box-demo'
                options={data}
                sx={{width:350}}
                renderInput={(champion)=><TextField  {...champion} label="Champion"/>}
                
                {...register('champion')}
             />}
            <Button type='submit' variant='contained'>Enviar</Button>
            </Stack>     
            </form>
        </div>
    )
}