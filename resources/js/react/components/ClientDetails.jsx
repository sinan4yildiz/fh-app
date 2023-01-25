import React from 'react'
import config from '../../config'
import useApi from '../hooks/useApi'
import Spinner from './Loading'

export default function ClientDetails({transactionId}) {
    if (!transactionId)
        return (<></>)

    const {data, error, loaded} = useApi(`${config.apiUrl}/client`,
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
                    <td className="w-40">Full name</td>
                    <td>: {`${data.customerInfo.billingFirstName} ${data.customerInfo.billingLastName}`}</td>
                </tr>
                <tr>
                    <td className="w-40">Email address</td>
                    <td>: {data.customerInfo.email}</td>
                </tr>
                <tr>
                    <td className="w-40">City</td>
                    <td>: {data.customerInfo.billingCity}</td>
                </tr>
                <tr>
                    <td className="w-40">Birthday</td>
                    <td>: {data.customerInfo.birthday}</td>
                </tr>
                <tr>
                    <td className="w-40">Created at</td>
                    <td>: {data.customerInfo.created_at}</td>
                </tr>
                <tr>
                    <td className="w-40">Updated at</td>
                    <td>: {data.customerInfo.updated_at}</td>
                </tr>
                </tbody>
            </table>
        </article>
    )
}
