import axios from 'axios'
import { useEffect, useState } from 'react'

const useApi = (url, payload) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setLoaded(false)
                const response = await axios.post(url, payload)
                setData(response.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoaded(true)
            }
        })()
    }, [Object.values(payload).join('+')])

    return {data, error, loaded}
}

export default useApi
