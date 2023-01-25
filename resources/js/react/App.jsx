import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Toolbar from './components/Toolbar'
import Transactions from './components/Transactions'

export default function App() {
    const [statusFilter, setStatusFilter] = useState('')

    return (
        <main>
            <Toolbar onStatusFilterChange={setStatusFilter}/>
            <Transactions status={statusFilter}/>
        </main>
    )
}

const root = createRoot(document.getElementById('app'))

root.render(<App/>)
