import './App.css'
import React, { lazy, Suspense } from 'react';
import { Route, Routes, HashRouter, BrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { config } from '@/config';
import { createAppKit } from '@reown/appkit/react'

import { arbitrum, mainnet, AppKitNetwork } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import {Page} from '@/components/Page';
import { backButton, swipeBehavior, useSignal, closingBehavior } from '@telegram-apps/sdk-react';
const Home = React.lazy(() => import('@/views/Home/index.tsx'));
const Launch = lazy(() => import("@/views/Launch/index.tsx"));
const Timer = lazy(() => import("@/views/Timer/index.tsx"));
const Language = lazy(() => import("@/views/Language/index.tsx"));
const Tool = lazy(() => import("@/views/Tool/index.tsx"));
const UseCallback = lazy(() => import("@/views/UseCallback/index.tsx"));
const Test = lazy(() => import("@/views/Test/index.tsx"));
const MiniApp = lazy(() => import("@/views/MiniApp/index.tsx"));

const queryClient = new QueryClient()
// const projectId = '7e53032c028ecd6c7cc9dccbde75067d'

// // 2. Create a metadata object - optional
// const metadata = {
//   name: 'AppKit',
//   description: 'AppKit Example',
//   url: 'https://example.com', // origin must match your domain & subdomain
//   icons: ['https://avatars.githubusercontent.com/u/179229932']
// }

// // 3. Set the networks
// const networks = [mainnet, arbitrum]

// // 4. Create Wagmi Adapter
// const wagmiAdapter = new WagmiAdapter({
//   networks,
//   projectId,
//   ssr: true
// })

// // 5. Create modal
// createAppKit({
//   adapters: [wagmiAdapter],
//   networks: [mainnet, arbitrum],
//   projectId,
//   metadata,
//   features: {
//     analytics: true // Optional - defaults to your Cloud configuration
//   }
// })
function App() {



  return (
    // <WagmiProvider config={config}>
    //   <QueryClientProvider client={queryClient}>
        <Suspense fallback={'loading'}>
          {/* <HashRouter> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Page><Home /></Page> }></Route>
              <Route path="/home" element={<Page><Home /></Page>}></Route>
              <Route path="/timer" element={<Page><Timer /></Page>}></Route>
              <Route path="/language" element={<Language />}></Route>
              <Route path="/tool" element={<Tool />}></Route>
              <Route path="/launch" element={<Launch />}></Route>
              <Route path="/usecallback" element={<UseCallback />}></Route>
              <Route path="/test" element={<Test />}></Route>
              <Route path="/miniapp" element={<MiniApp />}></Route>
            </Routes>
          </BrowserRouter>
          {/* </HashRouter> */}
        </Suspense>
    //   </QueryClientProvider>

    // </WagmiProvider>

  )
}

export default App
