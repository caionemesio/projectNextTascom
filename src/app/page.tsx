"use client"

import { Button } from "@mui/material";
import {signIn} from "next-auth/react"


export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center h-screen">
    <Button  onClick={()=>signIn("github",{callbackUrl:'/formScreen'})} variant="contained">Abrir com github</Button>
    </div>
    </>
  );
}
