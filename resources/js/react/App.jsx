import React from 'react'
import { createRoot } from 'react-dom/client'
import Toolbar from './components/Toolbar'
import Transactions from './components/Transactions'

export default function App() {
    return (<main>
        <Toolbar/>
        <Transactions/>
    </main>)
}

const root = createRoot(document.getElementById('app'))

root.render(<App/>)
