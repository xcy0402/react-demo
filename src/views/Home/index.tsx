
import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header/index.tsx';
import { Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import Keyboard from "react-simple-keyboard";
const Home: React.FC = () => {
    const [value, setValue] = useState('')
    const navigate = useNavigate();
    const [layoutName, setLayoutName] = useState('')
    const [status, setStatus] = useState(false)
    const handleShift = () => {
        console.log('handleShift', layoutName);
        setLayoutName(layoutName === "default" ? "shift" : "default");
    };
    const onKeyPress = (button: any) => {
        console.log('onKeyPress', button);
        console.log(keyboard?.current);
        if (button === "{shift}" || button === "{lock}") handleShift();

        if (button == '{bksp}') {
            // @ts-ignore
            // keyboard?.current?.clearInput();
        }
    };
    const onChange = (input: string) => {
        // @ts-ignore
        if (input === '.') return keyboard?.current?.setInput('');
        if (input.split('.').length > 2) {
            const val = change(input);
            setValue(val)
            // @ts-ignore
            keyboard?.current?.setInput(val);
        } else {
            setValue(input)
        }
        // @ts-ignore
        console.log(keyboard?.current?.getInput());
        console.log('onChange', input);
    };
    const go1 = (): void => {
        navigate('/test')
    }
    const [inputValue, setInputValue] = useState('');

    const keyboard = useRef();
    const handleInputChange = (e: any) => {
        const value = e.target.value;
        // 使用正则表达式检查输入值是否合法
        if (/^(?:[^\W_][\w\d\u0080-\uFFFF]*|)$/.test(value)) {
            setInputValue(value);
        }
    };

    const change = (val: string): string => {
        const index = val.indexOf('.');
        const includeNumber = /\d\./g.test(val);
        if (~index && includeNumber) {
            val = val.replace(/\./g, '');
            let valArray = val.split('');
            valArray.splice(index, 0, '.');
            val = valArray.join('');
        }
        return val;
    };

    return (
        <div className='max-w-7xl m-auto'>
            <Header></Header>
            Home
            <Button color="default" className='mx-4' onClick={go1}>navigate push 跳转</Button>
            <br />
            <input value={value} readOnly onFocus={(e: any) => {
                e.preventDefault();
            }} onClick={() => {
                setStatus(true)
                setTimeout(() => {
                    // @ts-ignore
                    keyboard?.current?.setInput(value);
                }, 0)
            }} />

            {status &&
                <div className='Keyboard-box' onClick={() => {
                    setStatus(false)
                }}>
                    <div onClick={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}>
                        <Keyboard
                            keyboardRef={(r) => (keyboard.current = r)}
                            onChange={onChange}
                            layout={{
                                default: ["1 2 3", "4 5 6", "7 8 9", "0 . {bksp}"],
                            }}

                        />
                    </div>

                </div>
            }
            <br />
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter letters or underscore"
            />
            <div className='aa'></div>
            <div>11111111111</div>
            {status && <div className='keyboard-placeholder'></div>}

        </div>
    );
}
export default Home;