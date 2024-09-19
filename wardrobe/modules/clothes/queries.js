const axios = require('axios')

const handleShowAllClothes = async () => {
    try {
        let data = []

        return [data,'success']
    } catch (err) {
        return [null,err]
    }
}

module.exports = {
    handleShowAllClothes
}