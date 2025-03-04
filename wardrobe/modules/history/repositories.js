const { ucEachFirstWord } = require("../../helpers/typography")
const { handleShowAllAppsHistory } = require("./queries")

const repoAllAppsHistory = async (ctx) => {
    try {
        const current_page = ctx.session.currentPage || 1
        const token = '388|T2gbtS9bSy1rtlnfqz64lqVoYjsZQVGjuS8ZXk5L8a317710'
        const [data, page_length, status] = await handleShowAllAppsHistory(current_page,token)
        
        if(data){
            let msg = ''
            data.forEach((dt) => {
                msg += `- ${dt.history_type} ${dt.history_context} at ${dt.created_at}\n\n`
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
    repoAllAppsHistory,
}