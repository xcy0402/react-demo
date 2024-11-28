import React, { useCallback, useEffect, useState } from 'react'
import { Button } from "@nextui-org/react";
import Header from '@/components/Header/index.tsx';
export default function UseCallback() {
    const [amount, setAmount] = useState(0)
    const fun1 = () => {
        console.log('不使用useCallback');
    }
    const fun2 = useCallback(() => {
        console.log('使用useCallback');
    }, [])
    return (
        <div>
            <Header></Header>
            <div className='max-w-7xl m-auto'>
                <div className='mb-4'>amount:{amount}</div>
                <div className='mb-4'>UseCallback返回旧的函数地址，配合memo使用不会重新构建Child组件</div>
                <Button className='mb-4' onClick={() => setAmount(amount + 1)}>点击我改变父组件与Child组件无关的State</Button><br />
                <Child fun={fun1} /><br />
                <Child2 fun={fun2} />
            </div>
        </div>
    )
}
interface bb {
    fun: () => void,
}
const Child:React.FC<bb>=(props)=> {
    const { fun } = props
    const [count, setCount] = useState(0)
    console.log('子组件被重新构建了', props.fun);
    useEffect(() => {
        console.log('useEffect被触发111');
        setCount(count + 1)
    }, [fun])
    return <>
        未使用useCallback 子组件重新构建+1：{count}
    </>
}
const Child2:React.FC<{fun:()=>void}> = React.memo((props) => {
    const { fun } = props
    const [count, setCount] = useState(0)
    console.log('子组件被重新构建了', props.fun);
    useEffect(() => {
        console.log('useEffect被触发222');
        setCount(count + 1)
    }, [fun])
    return <>
        使用useCallback 子组件重新构建+1：{count}
    </>
})