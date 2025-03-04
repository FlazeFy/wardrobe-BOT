const { ucEachFirstWord } = require("../../helpers/typography")
const { handleShowAllClothes, handleShowAllClothesUsedHistory } = require("./queries")

const repoAllClothes = async (ctx) => {
    try {
        const current_page = ctx.session.currentPage || 1
        const token = '388|T2gbtS9bSy1rtlnfqz64lqVoYjsZQVGjuS8ZXk5L8a317710'
        const [data, page_length, status] = await handleShowAllClothes('desc',current_page,token)
        
        if(data){
            let msg = ''
            data.forEach((dt,idx) => {
                const category = ucEachFirstWord(dt.clothes_category.replace('_',' '))
                const faded_status = dt.is_faded == 1 ? 'Fadedable' : ''
                const washed_status = dt.has_washed == 1 ? ', has washed' : ''
                const ironed_status = dt.has_ironed == 1 ? ', has ironed' : ''
                const favorite_status = dt.is_favorite == 1 ? ', favorited' : ''
                const scheduled_status = dt.is_scheduled == 1 ? ', scheduled' : ''
                let status_holder = `${faded_status}${washed_status}${ironed_status}${favorite_status}${scheduled_status}`
                if(status_holder.startsWith(', ')){
                    status_holder = status_holder.slice(2)
                }

                status_holder = `\nStatus : ${status_holder}`

                msg += `${idx+1}. <b>${dt.clothes_name}</b>\nCategory / Type : ${category} / ${dt.clothes_type}\nSize : ${dt.clothes_size}\nClothes Gender : ${dt.clothes_gender}\nQty : ${dt.clothes_qty}${status_holder}\n\n`
            });

            return [msg, page_length]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

const repoAllClothesUsedHistory = async (ctx) => {
    try {
        const current_page = ctx.session.currentPage || 1
        const token = '388|T2gbtS9bSy1rtlnfqz64lqVoYjsZQVGjuS8ZXk5L8a317710'
        const [data, page_length, status] = await handleShowAllClothesUsedHistory('desc',current_page,token)
        
        if(data){
            let msg = ''
            data.forEach((dt,idx) => {
                const note_holder = `\nNotes : ${dt.clothes_note ?? '-'}`

                msg += `${idx+1}. <b>${dt.clothes_name}</b>\nType : ${dt.clothes_type}\nUsed Context : ${dt.used_context}\nUsed At : ${dt.created_at}${note_holder}\n\n`
            });

            return [msg, page_length]
        } else {
            return [status, null]
        }
    } catch (err) {
        return [err, null]
    }
}

module.exports = {
    repoAllClothes,
    repoAllClothesUsedHistory
}