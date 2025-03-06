const {  handleShowMostUsedClothes } = require("./queries")

const repoMostUsedClothes = async (ctx) => {
    try {
        const token = '388|T2gbtS9bSy1rtlnfqz64lqVoYjsZQVGjuS8ZXk5L8a317710'
        const [data,status] = await handleShowMostUsedClothes(token)
        
        if (data) {
            let msg = 'Most Used Clothes : \n'
            
            if(data.clothes_merk && data.clothes_merk.length > 0){
                msg += 'By Its Merk\n'
                data.clothes_merk.forEach((dt,idx)=> {
                    msg += ` ${dt.context} (${dt.total})\n`
                });
            }
            if(data.clothes_type && data.clothes_type.length > 0){
                msg +='\nBy Its Type\n'
                data.clothes_type.forEach((dt,idx)=> {
                    msg += ` ${dt.context} (${dt.total})\n`
                });
            }
            if(data.clothes_size && data.clothes_size.length > 0){
                msg += '\nBy Its Size\n'
                data.clothes_size.forEach((dt,idx)=> {
                    msg += ` ${dt.context} (${dt.total})\n`
                });
            }
            if(data.clothes_made_from && data.clothes_made_fromlength > 0){
                msg += '\nBy Its Made From\n'
                data.clothes_made_from.forEach((dt,idx)=> {
                    msg += ` ${dt.context} (${dt.total})\n`
                });
            }
            
            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

module.exports = {
    repoMostUsedClothes,
}