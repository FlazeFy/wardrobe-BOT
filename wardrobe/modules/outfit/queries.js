const axios = require('axios')

const handleShowAllOutfit = async (page,token) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/clothes/outfit?page=${page}`, {
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
    handleShowAllOutfit
}