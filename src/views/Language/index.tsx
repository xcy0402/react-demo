
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/index.tsx';
import { Select, SelectItem } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';
const Language: React.FC = () => {
    const langs = [
        { key: "en", label: "English" },
        { key: "zh", label: "简体中文" },
    ];
    const { t, i18n } = useTranslation();
    const [value, setValue] = useState([''])
    useEffect(() => {
        console.log('useEffect');
        const lang = localStorage.getItem('lang');
        if (lang) {
            setValue([lang])
            i18n.changeLanguage(lang);
        } else {
            setValue(['zh'])
            i18n.changeLanguage('zh');
            localStorage.setItem('lang', 'zh');
        }
        return ()=>{
            console.log('销毁');
        }
    }, [i18n])
    const changeLang = (key: any) => {
        if (!key) return
        setValue([key]);
        i18n.changeLanguage(key);
        localStorage.setItem('lang', key);
    }
    return (
        <div className='max-w-7xl m-auto'>
            <Header></Header>
            <Select
                selectedKeys={value}
                variant='flat'
                label={t('now-lan')}
                className="max-w-xs mb-2"
                onSelectionChange={(keys) => changeLang(keys.currentKey)}
            >
                {langs.map((lang) => (
                    <SelectItem key={lang.key}>
                        {lang.label}
                    </SelectItem>
                ))}
            </Select>
            <p className='mb-2 '>{t('poetry1')}</p>
            <p className='mb-2'>{t('poetry2')}</p>
            <p className='mb-2'>{t('poetry3')}</p>
            <p className='mb-2'>{t('poetry4')}</p>
        </div>
    );
}
export default Language;