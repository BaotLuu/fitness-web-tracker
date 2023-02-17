import { JournalContext } from '../context/JournalContext'
import {useContext} from 'react'

export const useJournalContext = () => {
    const context = useContext(JournalContext)

    if(!context){
        throw Error('useJournalContext must be used inside an JournalContextProvider')
    }
    
    return context
}