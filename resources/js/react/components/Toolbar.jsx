import React from 'react'

export default function Toolbar() {
    return (
        <section className="flex items-center mb-4">
            <h1 className="text-gray-500 dark:text-gray-400 text-xl font-medium">Transactions</h1>
            <div className="ml-auto flex items-center w-72">
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-0 focus:outline-none focus:border-blue-500 block w-full py-2.5 px-3.5 dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:border-blue-500">
                    <option>Date Range</option>
                    <option value="2021-01-01|2022-01-01">Last year</option>
                    <option value="2020-01-01|2022-01-01">Last 2 years</option>
                    <option value="20217-01-01|2022-01-01">Last 5 years</option>
                    <option value="2011-01-01|2022-01-01">Last 10 years</option>
                </select>
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-0 font-medium rounded-r-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-900 dark:hover:border-gray-700 border-l-0 whitespace-nowrap">
                    Get Report
                </button>
            </div>
        </section>
    )
}
