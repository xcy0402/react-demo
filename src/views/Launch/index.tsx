import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/index.tsx';
import Footer from '@/components/Footer/index.tsx';
// import useRootStore from '@/store/root';
import { useAccount, useWatchAsset, useBalance, usePublicClient, useSwitchChain, useSwitchAccount, useSignMessage, useReadContracts, useClient } from 'wagmi';
import { Button } from "@nextui-org/react";
import abi from '@/config/token_abi.json';
import { Client, formatUnits } from 'viem'
import { readContract, waitForTransactionReceipt } from "viem/actions";
// import type {Abi} from 'abitype'
const Launch: React.FC = () => {
    // const { address: a } = useRootStore()
    const { address, chainId } = useAccount()
    const { watchAsset } = useWatchAsset()
    console.log(2222222, address, chainId);
    const getIsAdd = async () => {
        const result = await watchAsset({
            type: 'ERC20',
            options: {
                address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
                symbol: 'TestERC20',
                decimals: 18,
            },
        })
        console.log(result);
    }
    const { chains, switchChain } = useSwitchChain()
    const { connectors, switchAccount } = useSwitchAccount()
    console.log(connectors);
    const { signMessage } = useSignMessage()
    const sign = async () => {
        signMessage({ message: 'hello world' }, {
            onSuccess(result) {
                console.log('签名结果:', result);
            }, onError(error) {
                console.error(error);
            }
        })

    }
    return (
        <div className='max-w-7xl m-auto'>
            <Header></Header>
            <div>
                <div>我的地址：{address || ''}</div>
                <div>当前网络：{chainId || ''}</div>
                {mainBalance(address)}
                <ClientGetTokenBalance address={address} chainId={chainId} />
                <div className='mb-4'><Button onClick={getIsAdd} color="default">添加代币</Button></div>
                <div className='mb-4'>
                    {chains.map((chain) => (
                        <Button className='mr-2' key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
                            切换到 {chain.name}
                        </Button>
                    ))}
                </div>
                <div className='mb-4'><Button onClick={sign} color="default">签名</Button></div>
                <TokenInfo />
            </div>
            <Footer></Footer>
        </div>
    );
}
function mainBalance(address: `0x${string}` | undefined) {

    const { data: balance } = useBalance({
        address,
    })
    if (!address) return null;
    return <div>我的余额：{balance ? balance.formatted + balance.symbol : 0}</div>
}
interface bb {
    address: `0x${string}` | undefined,
    chainId: number | undefined
}

function ClientGetTokenBalance(props: bb) {
    const { address, chainId } = props
    const [blockNumber, setBlockNumber] = useState(0);
    const [balance, setBalance] = useState(0);
    const client = usePublicClient()
    const getBlockBumber = async () => {
        const blockNumber = await client?.getBlockNumber()
        console.log('client获取区块：',blockNumber);
        setBlockNumber(Number(blockNumber))
    }
    const getBalance = async () => {
        const balance = await client?.getBalance({ address: address! })
        console.log('client获取余额：',balance);
        setBalance(Number(balance))
    }
    console.log('ClientGetTokenBalance-111111111');
    useEffect(() => {
        console.log('ClientGetTokenBalance-22222222');
        if (address) getBlockBumber()
        if (address) getBalance()
    }, [chainId])
    if (!address) return null;
    return (<div className='my-4'>
        <div className='flex mb-2'>当前区块：{blockNumber}</div>
        <div className='flex mb-2'>余额：{balance}</div>
    </div>)
}
function TokenInfo() {

    const [symbol, setSymbol] = useState('')
    const [decimal, setDecimal] = useState(0)
    const [balance, setBalance] = useState(0)
    const { address } = useAccount()
    const contract = {
        address: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`,
        abi
    }
    const results = useReadContracts({
        contracts: [
            {
                ...contract,
                functionName: 'decimals',
            },
            {
                ...contract,
                functionName: 'symbol',
            },
            {
                ...contract,
                functionName: 'balanceOf',
                args: [address]
            }
        ]
    })
    console.log(results.data);
    // results.data?.forEach((item, index) => {
    //     item.status == 'success' && index == 0 && setDecimal(Number(item.result));
    //     item.status == 'success' && index == 1 && setSymbol(item.result as string);
    //     item.status == 'success' && index == 2 && setBalance(Number(formatUnits(item.result as bigint,decimal)));
    // })
    const client = useClient()
    const getBalance = async () => {
        console.log(client);
        const result = await readContract(client as Client, {
            ...contract,
            functionName: 'balanceOf',
            args: [address]
        })
        console.log(result);
    }
    useEffect(() => {
        getBalance()
    }, [])
    return (
        <>
            <div className='mb-4'>代币符号：{symbol}</div>
            <div className='mb-4'>代币小数位：{decimal}</div>
            <div className='mb-4'>代币余额：{balance}</div>
        </>
    )
}
export default Launch;