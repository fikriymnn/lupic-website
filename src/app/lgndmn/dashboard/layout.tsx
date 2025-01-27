"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [auth,setAuth] = useState(false)

    useEffect(()=>{
        async function getData(){
            try{
                const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/api/user",{
                    withCredentials: true,
                  })
                  if(Data.data=="success"){
                    setAuth(true)
                  }else{
                    window.location.href="/"
                  }
            }catch(err:any){
                alert(err.message)
            }
        }
        getData()
    },[])
    return (
        <>
        {auth==true?children:""}
        </>
          
    );
  }