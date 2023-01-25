import React from 'react'
import config from '../../config'
import useApi from '../hooks/useApi'
import Spinner from './Loading'

export default function TransactionDetails({transactionId}) {
    if (!transactionId)
        return (<></>)

    const {data, error, loaded} = useApi(`${config.apiUrl}/transaction`,
        {
            transactionId: transactionId
        }
    )

    if (!loaded)
        return (<Spinner className="mt-20"/>)

    return (
        <article>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                <tr>
                    <td className="w-40">Transaction ID</td>
                    <td>: {data.transaction.merchant.transactionId}</td>
                </tr>
                <tr>
                    <td className="w-40">Customer</td>
                    <td>: {`${data.customerInfo.billingFirstName} ${data.customerInfo.billingLastName}`}</td>
                </tr>
                <tr>
                    <td className="w-40">Amount</td>
                    <td>: {`${data.fx.merchant.originalAmount} ${data.fx.merchant.originalCurrency}`}</td>
                </tr>
                <tr>
                    <td className="w-40">Operation</td>
                    <td>: {data.transaction.merchant.operation}</td>
                </tr>
                <tr>
                    <td className="w-40">Channel</td>
                    <td>: {data.transaction.merchant.channel}</td>
                </tr>
                <tr>
                    <td className="w-40">Status</td>
                    <td>: {data.transaction.merchant.status}</td>
                </tr>
                <tr>
                    <td className="w-40">Crated at</td>
                    <td>: {data.transaction.merchant.created_at}</td>
                </tr>
                <tr>
                    <td className="w-40">Updated at</td>
                    <td>: {data.transaction.merchant.updated_at}</td>
                </tr>
                </tbody>
            </table>
        </article>
    )
}
