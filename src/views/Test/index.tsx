import React from 'react'
import { Button } from "@nextui-org/react";
import {useNavigate,useParams} from 'react-router-dom';
const Test:React.FC=(props)=> {
  const navigate=useNavigate()
  let params = useParams()
    const Back1=():void=>{
      window.history.go(-1);
    }
    const Back2=():void=>{
      window.history.back();
    }
    const Back3=():void=>{
      console.log(params);
      navigate(-1);
    }
  return (
    <div className='h-screen flex justify-center items-center'>
        <Button color="default" className='mx-4' onClick={Back1}>使用window.history.go(-1) Back</Button>
        <Button color="default" className='mx-4' onClick={Back2}>使用window.history.back() Back</Button>
        <Button color="default" className='mx-4' onClick={Back3}>使用useNavigate Back</Button>
    </div>
  )
}
export default Test;