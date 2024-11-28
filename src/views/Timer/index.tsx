import React, { useState } from 'react'
import Header from '@/components/Header/index.tsx';
export default function Timer() {
    const [num, setNum] = useState(0)
    const [num2, setNum2] = useState(0)
    const [sum, setSum] = useState(0)
    const addNum = () => {
        console.log(num);
        setNum(num + 1)
    }
    const addNum2 = (i: number) => {
        console.log(num2);
        setNum2(num2 + i)
    }
    const handelSum=(num1:number,num2:number)=>{
        setSum(num1+num2)
    }
    return (
        <div>
            <Header></Header>
            <div className='max-w-7xl m-auto'>
                <div className='mb-4'>num1:{num}</div>
                <div className='mb-4'>num2:{num2}</div>
                <div className='mb-4'>和:{sum}</div>
                <button className='bg-slate-600 rounded-full p-3 mr-4' onClick={addNum}>加1</button>
                <button className='bg-slate-600 rounded-full p-3 mr-4' onClick={() => addNum2(2)}>加2</button>
                <button className='bg-slate-600 rounded-full p-3 mr-4' onClick={() => handelSum(num,num2)}>求和</button>
            </div>
        </div>

    )
}
