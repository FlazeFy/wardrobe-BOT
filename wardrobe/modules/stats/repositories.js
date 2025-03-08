const { ucEachFirstWord } = require("../../helpers/typography")
const {  handleShowMostUsedClothes, handleShowMostUsedDailyClothesPerType } = require("./queries")

const repoMostUsedClothes = async () => {
    try {
        const token = '388|T2gbtS9bSy1rtlnfqz64lqVoYjsZQVGjuS8ZXk5L8a317710'
        const [data,status] = await handleShowMostUsedClothes(token)
        
        if (data) {
            let msg = 'Most Used Clothes : \n'
            
            if(data.clothes_merk && data.clothes_merk.length > 0){
                msg += 'By Its Merk\n'
                data.clothes_merk.forEach((dt,idx)=> {
                    msg += `- ${dt.context} (${dt.total})\n`
                });
            } else {
                msg += '<i>- No Clothes Found -</i>\n'
            }
            if(data.clothes_type && data.clothes_type.length > 0){
                msg +='\nBy Its Type\n'
                data.clothes_type.forEach((dt,idx)=> {
                    msg += `- ${dt.context} (${dt.total})\n`
                });
            } else {
                msg += '<i>- No Clothes Found -</i>\n'
            }
            if(data.clothes_size && data.clothes_size.length > 0){
                msg += '\nBy Its Size\n'
                data.clothes_size.forEach((dt,idx)=> {
                    msg += `- ${dt.context} (${dt.total})\n`
                });
            } else {
                msg += '<i>- No Clothes Found -</i>\n'
            }
            if(data.clothes_made_from && data.clothes_made_from.length > 0){
                msg += '\nBy Its Made From\n'
                data.clothes_made_from.forEach((dt,idx)=> {
                    msg += `- ${dt.context} (${dt.total})\n`
                });
            } else {
                msg += '<i>- No Clothes Found -</i>\n'
            }
            
            return [msg, null]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoMostUsedDailyClothesPerType = async () => {
    try {
        const token = '388|T2gbtS9bSy1rtlnfqz64lqVoYjsZQVGjuS8ZXk5L8a317710'
        const [data,status] = await handleShowMostUsedDailyClothesPerType(token)
        
        if (data) {
            let msg = 'Most Used Clothes (Daily) : \n'

            data.forEach(dt => {
                msg += `<b>${dt.day}</b>\n`

                if(dt.clothes && dt.clothes.length > 0){
                    dt.clothes.forEach((cl,idx) => {
                        const category = ucEachFirstWord(cl.clothes_category.replace('_',' '))

                        msg += `${idx+1}. <b>${cl.clothes_name}</b>\nCategory / Type : ${category} / ${cl.clothes_type}\nTotal Used : ${cl.total}\nLast Used : ${cl.last_used}\n\n`
                    });
                    msg += '\n'
                } else {
                    msg += `<i>- No Clothes Has Used On This Day -</i>\n\n`
                }
            })
            
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
    repoMostUsedDailyClothesPerType
}