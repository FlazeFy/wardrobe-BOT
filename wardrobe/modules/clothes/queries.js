const axios = require('axios')

const handleShowAllClothes = async (order,page,token) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/clothes/header/all/${order}?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        let page_length, data, status

        status = response.status
        if(page != "all"){
            const res = response.data.data
            data = res.data
            page_length = res.last_page
        } else {
            const res = response.data
            data = res.data
            page_length = null
        }

        return [data, page_length, status]
    } catch (err) {
        return [null,err]
    }
}

const handleShowAllClothesUsedHistory = async (order,page,token) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/clothes/history/all/${order}?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        let page_length, data, status

        status = response.status
        if(page != "all"){
            const res = response.data.data
            data = res.data
            page_length = res.last_page
        } else {
            const res = response.data
            data = res.data
            page_length = null
        }

        return [data, page_length, status]
    } catch (err) {
        return [null,err]
    }
}

const handleShowAllClothesSchedule = async (token) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/clothes/schedule/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        let page_length, data, status

        status = response.status
        const res = response.data
        data = res.data
        page_length = null

        return [data, status]
    } catch (err) {
        return [null,err]
    }
}

const handleShowAllClothesWashHistory = async (page,token) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/clothes/wash_history?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        let page_length, data, status

        status = response.status
        if(page != "all"){
            const res = response.data.data
            data = res.data
            page_length = res.last_page
        } else {
            const res = response.data
            data = res.data
            page_length = null
        }

        return [data, page_length, status]
    } catch (err) {
        return [null,err]
    }
}

module.exports = {
    handleShowAllClothes,
    handleShowAllClothesUsedHistory,
    handleShowAllClothesSchedule,
    handleShowAllClothesWashHistory
}