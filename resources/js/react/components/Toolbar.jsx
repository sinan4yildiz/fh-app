import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Report from './Report'

export default function Toolbar() {
    const [reportDateRange, setReportDateRange] = useState('')
    let [isReportModalOpen, setIsReportModalOpen] = useState(false)

    function closeReportModal() {
        setIsReportModalOpen(false)
    }

    function openReportModal() {
        if (!!reportDateRange)
            setIsReportModalOpen(true)
    }

    return (
        <section className="flex items-center mb-4">
            <h1 className="text-gray-500 dark:text-gray-400 text-xl font-medium">Transactions</h1>
            <div className="ml-auto flex items-center w-72">
                <select onChange={event => setReportDateRange(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-0 focus:outline-none focus:border-blue-500 block w-full py-2.5 px-3.5 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:border-blue-500">
                    <option value="">Date Range</option>
                    <option value="2021-01-01|2022-01-01">Last year</option>
                    <option value="2020-01-01|2022-01-01">Last 2 years</option>
                    <option value="20217-01-01|2022-01-01">Last 5 years</option>
                    <option value="2011-01-01|2022-01-01">Last 10 years</option>
                </select>
                <button type="button" onClick={openReportModal} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-0 font-medium rounded-r-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-900 dark:hover:border-gray-700 border-l-0 whitespace-nowrap">
                    Get Report
                </button>
            </div>
            <Transition appear show={isReportModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeReportModal}>
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
                                        Report
                                        <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-gray-700 p-1.5 text-sm font-medium text-blue-900 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={closeReportModal}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 fill-current">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                    </Dialog.Title>
                                    <div className="mb-4 mt-8">
                                        <Report reportDateRange={reportDateRange}/>
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
