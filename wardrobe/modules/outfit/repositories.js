const { ucEachFirstWord } = require("../../helpers/typography")
const { handleShowAllOutfit } = require("./queries")

const repoAllOutfit = async (ctx) => {
    try {
        const current_page = ctx.session.currentPage || 1
        const token = '388|T2gbtS9bSy1rtlnfqz64lqVoYjsZQVGjuS8ZXk5L8a317710'
        const [data, page_length, status] = await handleShowAllOutfit(current_page,token)
        
        if(data){
            let msg = ''
            data.forEach((dt,idx) => {
                const favorite_status = dt.is_favorite == 1 ? 'Favorited' : ''
                const notes_holder = `\nNotes : ${dt.outfit_note ?? '-'}${favorite_status}`
                let clothes_holder = ''

                if(dt.clothes && dt.clothes.length > 0){
                    clothes_holder += 'List Clothes : '
                    dt.clothes.forEach((cl,idx_cl)=> {
                        clothes_holder += `\n- <b>${cl.clothes_name}</b>\nType : ${cl.clothes_type}\nMerk : ${cl.clothes_merk}\nColor : ${cl.clothes_color}\nWashed : ${cl.has_washed == 1 ? 'Yes' : 'No'}`
                    })
                } else {
                    clothes_holder += '<i>- No Clothes Attached -</i>'
                }

                msg += `${idx+1}. <b>${dt.outfit_name}</b>\nTotal Used : ${dt.total_used}${notes_holder}\n${clothes_holder}\n\n`
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
    repoAllOutfit,
}