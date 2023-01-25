import React from 'react'
import Chart from 'react-apexcharts'
import config from '../../config'
import useApi from '../hooks/useApi'
import Spinner from './Loading'

export default function Report({reportDateRange}) {
    if (!!!reportDateRange)
        return (<></>)

    const dateRange = reportDateRange.split('|')

    const {data, error, loaded} = useApi(`${config.apiUrl}/report`,
        {
            fromDate: dateRange[0],
            toDate: dateRange[1]
        })

    if (!loaded)
        return (<Spinner className="mt-20"/>)

    let chartData = {
        options: {
            chart: {},
            xaxis: {
                categories: []
            }
        },
        series: [
            {
                name: 'Count',
                data: []
            },
            {
                name: 'Total',
                data: []
            }
        ]
    }

    data.map((report) => {
        chartData.options.xaxis.categories.push(report.currency)
        chartData.series[0].data.push(report.count)
        chartData.series[1].data.push(report.total)
    })

    return (
        <article>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                width="500"
            />
        </article>
    )
}
