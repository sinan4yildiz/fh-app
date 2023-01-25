import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import config from '../../config'
import useApi from '../hooks/useApi'
import ClientDetails from './ClientDetails'
import Spinner from './Loading'
import TransactionDetails from './TransactionDetails'

export default function Transactions() {
    let [selectedTransactionId, setSelectedTransactionId] = useState(null)
    let [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
    let [isClientModalOpen, setIsClientModalOpen] = useState(false)

    const {data, error, loaded} = useApi(`${config.apiUrl}/transactions`,
        {
            fromDate: '2015-10-01',
            toDate: '2022-01-24'
        })

    function closeTransactionDetailsModal() {
        setSelectedTransactionId(null)
        setIsTransactionModalOpen(false)
    }

    function openTransactionDetailsModal(transactionId) {
        setSelectedTransactionId(transactionId)
        setIsTransactionModalOpen(true)
    }

    function closeClientDetailsModal() {
        setSelectedTransactionId(null)
        setIsClientModalOpen(false)
    }

    function openClientDetailsModal(transactionId) {
        setSelectedTransactionId(transactionId)
        setIsClientModalOpen(true)
    }

    if (!loaded)
        return (<Spinner className="mt-20"/>)

    return (
        <section>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-4">
                            Customer
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-4">
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.data.map((transaction, key) =>
                        <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-200 font-medium">
                                <button type="button" className="flex items-center gap-2" onClick={() => openClientDetailsModal(transaction.transaction.merchant.transactionId)}>
                                    {`${transaction.customerInfo.billingFirstName} ${transaction.customerInfo.billingLastName}`}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                </button>
                            </th>
                            <td className="px-6 py-4">
                                {`${transaction.fx.merchant.originalAmount} ${transaction.fx.merchant.originalCurrency}`}
                            </td>
                            <td className="px-6 py-4">
                                {transaction.transaction.merchant.status}
                            </td>
                            <td className="px-6 py-4">
                                {transaction.created_at}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => openTransactionDetailsModal(transaction.transaction.merchant.transactionId)} type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Details
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <Transition appear show={isTransactionModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeTransactionDetailsModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="flex items-center justify-between text-lg font-medium leading-6 text-gray-900 dark:text-gray-400">
                                        Transaction Details
                                        <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-700 p-1.5 text-sm font-medium text-blue-900 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={closeTransactionDetailsModal}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 fill-current">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                    </Dialog.Title>
                                    <div className="mb-4 mt-8">
                                        <TransactionDetails transactionId={selectedTransactionId}/>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={isClientModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeClientDetailsModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="flex items-center justify-between text-lg font-medium leading-6 text-gray-900 dark:text-gray-400">
                                        Client Details
                                        <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-700 p-1.5 text-sm font-medium text-blue-900 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={closeClientDetailsModal}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 fill-current">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                    </Dialog.Title>
                                    <div className="mb-4 mt-8">
                                        <ClientDetails transactionId={selectedTransactionId}/>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </section>
    )
}
