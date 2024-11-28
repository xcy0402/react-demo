import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@/language';
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { init } from "./init";
import { isTMA, retrieveLaunchParams} from '@telegram-apps/sdk-react';
import "react-simple-keyboard/build/css/index.css";

isTMA().then((v) => {
  console.log("isTMA", v)
  if (v) {
    init(retrieveLaunchParams().startParam === 'debug');
  }

})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
        <App />
        <Toaster/>
    </NextUIProvider>
  </StrictMode>,
)
