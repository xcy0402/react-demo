import React from 'react';
import { Link, Path } from 'react-router-dom';
import useRootStore from '@/store/root';
import { Button } from "@nextui-org/react";
// import { useConnect,useAccount,useDisconnect } from 'wagmi'
// import { injected } from 'wagmi/connectors'
interface items {
    path: string | Partial<Path>,
    label: String
}
const Header: React.FC = () => {
    // const {  address :a, connectAction, disconnectAction } = useRootStore()
    const headItems: items[] = [
        { path: '/home', label: '首页' },
        { path: '/launch', label: '发射台' },
    ];
    // const { connect } = useConnect()
    // console.log(1111111111111,connect);    
    // const { address,isConnected } = useAccount()
    // const { disconnect } = useDisconnect()
    // const connectWallet = () => {
    //     connect({ connector: injected() })
    //     console.log(address);
    //     connectAction()
    // }
    // const disconnectWallet=()=>{
    //     disconnect()
    //     disconnectAction()
    // }
    return (
        <div className='max-w-7xl m-auto py-10'>
            <ul className='flex grow mb-2'>
                <li className='text-slate-300 hover:text-white'><Link className='px-4' to='/home'>首页</Link></li>
                <li className='text-slate-300 hover:text-white'><Link className='px-4' to='/timer'>定时器</Link></li>
                <li className='text-slate-300 hover:text-white'><Link className='px-4' to='/language'>国际化</Link></li>
                <li className='text-slate-300 hover:text-white'><Link className='px-4' to='/tool'>工具</Link></li>
                <li className='text-slate-300 hover:text-white'><Link className='px-4' to='/launch'>状态管理</Link></li>
                <li className='text-slate-300 hover:text-white'><Link className='px-4' to='/usecallback'>useCallback使用</Link></li>
                <li className='text-slate-300 hover:text-white'><Link className='px-4' to='/miniapp'>MiNiAPP</Link></li>
            </ul>
            <ul className='flex grow mb-2'>
                {headItems.map((item, index) => <li key={index} className='text-slate-300 hover:text-white'><Link className='px-4' to={item.path}>{item.label}</Link></li>)}
            </ul>
            {/* <div className='flex items-center'>
                <div>钱包地址：{address}</div>
                {isConnected ? <Button color="danger" className='mx-4' onClick={disconnectWallet}>断开连接</Button> : <Button color="default" className='mx-4' onClick={connectWallet}>连接钱包</Button>}
            </div>
            <w3m-button /> */}
        </div>
    );
}
export default Header;