import React from 'react'
import axios from 'axios'

export default function useFetch(){
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [res, setRes] = React.useState(false)

    const reset = () => {
        setError(false)
        setRes(false)
        setLoading(false)
    }

    const getData = (url, config) => {
        reset()
        setLoading(true)
        return axios.get(url, config)
        .then(res=>setData(res.data))
        .catch(err=>setError(true))
        .finally(()=>setLoading(false))
    }

    const postData = (url, data, config) => {
        reset()
        setLoading(true)
        return axios.post(url, data, config)
        .then(res=>setRes(res))
        .catch(err=>setError(err))
        .finally(_=>setLoading(false))
    }

    const deleteData = (url, config) => {
        reset()
        setLoading(true)
        return axios.delete(url, config)
        .then(res=>setRes(res))
        .catch(err=>setError(err))
        .finally(_=>setLoading(false))
    }

    const patchData = (url, changes, config) => {
        reset()
        setLoading(true)
        return axios.patch(url, changes, config)
        .then(res=>setRes(res))
        .catch(err=>setError(err))
        .finally(_=>setLoading(false))
    }


    return {data, loading, error, res, getData, postData, deleteData, patchData, reset}
    }