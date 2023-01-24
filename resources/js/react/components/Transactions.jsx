import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import useFetch from 'react-fetch-hook'
import config from '../../config'
import Spinner from './Loading'

export default function Transactions() {
    let [isModalOpen, setIsModalOpen] = useState(false)

    const {isLoading, data} = useFetch(`${config.apiUrl}/transactions`, {
        method: 'POST',
        body: JSON.stringify({
            fromDate: '2015-10-01',
            toDate: '2022-01-24'
        })
    })

    function closeModal() {
        setIsModalOpen(false)
    }

    function openModal() {
        setIsModalOpen(true)
    }

    if (isLoading)
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
                                {`${transaction.customerInfo.billingFirstName} ${transaction.customerInfo.billingLastName}`}
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
                                <button onClick={openModal} type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Details
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Payment successful
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Your payment has been successfully submitted. We’ve sent
                                            you an email with all of the details of your order.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
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
