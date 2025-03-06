const axios = require('axios')

const handleShowMostUsedClothes = async (token) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/v1/stats/clothes/by/clothes_type,clothes_merk,clothes_size,clothes_made_from,clothes_category`, null ,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        let data, status

        status = response.status
        const res = response.data
        data = res.data

        return [data, status]
    } catch (err) {
        return [null,err]
    }
}

module.exports = {
    handleShowMostUsedClothes,
}