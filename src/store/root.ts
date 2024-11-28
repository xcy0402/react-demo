import { create } from 'zustand'
import { devtools, persist,createJSONStorage } from 'zustand/middleware'

interface State {
    address: string,
    balance: number
}
interface Action {
    connectAction: () => void
    disconnectAction: () => void
}
const useRootStore = create(
    devtools(
        persist<State & Action>(
            (set) => ({
                address: '',
                balance: 0,
                a: 0,
                connectAction: async () => {
                    set(()=>({address:'111111111111111'}))
                },
                disconnectAction:async()=>{
                    set(()=>({address:''}))
                }
            }),
            {
                name: 'root-storage',
                storage:createJSONStorage(()=>sessionStorage) 
            },
        )
    )
)
export default useRootStore;