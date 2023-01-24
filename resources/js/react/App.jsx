import React from 'react'
import { createRoot } from 'react-dom/client'
import Transactions from './components/Transactions'

export default function App() {
    return (
        <>
            <Transactions/>
        </>
    )
}

const root = createRoot(document.getElementById('app'))

root.render(<App/>)
