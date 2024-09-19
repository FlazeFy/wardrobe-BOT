const { handleShowAllAirplane } = require("./queries")

const repoAllClothes = async () => {
    try {
        const [data, status] = await handleShowAllAirplane()
        
        if(data){
            let msg = ''

            return msg
        } else {
            return null
        }
    } catch (err) {
        return [err, null]
    }
}

module.exports = {
    repoAllClothes,
}