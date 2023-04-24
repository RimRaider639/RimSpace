import React from 'react'
import axios from 'axios'

export default function useFetch(){
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [res, setRes] = React.useState(false)

    const getData = (url, config) => {
        setLoading(true)
        setError(false)
        setData([])
        return axios.get(url, config)
        .then(res=>setData(res.data))
        .catch(err=>setError(true))
        .finally(()=>setLoading(false))
    }

    const postData = (url, data, config) => {
        setLoading(true)
        setError(false)
        setRes(false)
        return axios.post(url, data, config)
        .then(res=>setRes(res))
        .catch(err=>setError(err))
        .finally(_=>setLoading(false))
    }

    const deleteData = (url, config) => {
        setLoading(true)
        setError(false)
        setRes(false)
        return axios.delete(url, config)
        .then(res=>setRes(res))
        .catch(err=>setError(err))
        .finally(_=>setLoading(false))
    }

    const patchData = (url, changes, config) => {
        setLoading(true)
        setError(false)
        setRes(false)
        return axios.patch(url, changes, config)
        .then(res=>setRes(res))
        .catch(err=>setError(err))
        .finally(_=>setLoading(false))
    }

    return {data, loading, error, res, getData, postData, deleteData, patchData}
    }