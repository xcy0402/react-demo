import Header from '@/components/Header/index.tsx';
import { Button } from "@nextui-org/react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-hot-toast';
import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { openTelegramLink, } from '@telegram-apps/sdk-react';
import { detect } from '../../utils';

export default function Tool() {
    const gitUrl = 'https://github.com/search?q=copy-to-clipboard&type=repositories'
    const copyText = (text: string, result: boolean) => {
        console.log(text, result);
        if (result) {
            toast.remove();
            toast.success('复制成功')
        } else {
            toast.error('复制失败')
        }
    }
    const avatar = useMemo(() => {
        return createAvatar(lorelei, {
            size: 128,
            seed: 'Nolan',
            // ... other options
        }).toDataUri();
    }, []);
    return (
        <div>
            <Header></Header>
            <div className='max-w-7xl m-auto'>
                <div className='flex w-[180px] h-[180px] m-auto  mb-4 p-2 border-0 bg-white border-slate-500 rounded-lg'>
                    <QRCodeSVG value={gitUrl} className='w-full h-full' />
                </div>
                <div className='w-4/5 m-auto flex items-center justify-between mb-4 py-2 px-4 rounded-full bg-slate-950'>
                    <div className='shrink-0'>git地址：</div>
                    <div className='truncate mx-2'>{gitUrl}</div>
                    <CopyToClipboard text={gitUrl}
                        onCopy={(text, result) => copyText(text, result)}>
                        <Button color="default">
                            复制链接
                        </Button>
                    </CopyToClipboard>
                </div>
                <img src={avatar} />
                <Button onClick={() => {
                    //@ts-ignore
                    // window.location.href = "intent://fightplus.gitbook.io/figh#Intent;scheme=https;package=com.android.aaa;end";
                    window.location.href = "intent://fightplus.gitbook.io/figh#Intent;scheme=https;package=aaa";
                    console.log(detect(window.navigator));
                    //@ts-ignore
                    console.log(window.UIApplication);
                    // if let url = URL(string: "https://www.example.com") {
                    //     UIApplication.shared.open(url, options: [:], completionHandler: nil)
                    // }

                    var u = navigator.userAgent;
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器 
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //io
                    console.log(isAndroid,isiOS);

                }}>open</Button>
            </div>
        </div>
    )
}
