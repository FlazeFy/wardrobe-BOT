const { Telegraf, Markup, session } = require('telegraf')
const fs = require('fs')

const configFile = fs.readFileSync('./configs/telegram.json', 'utf8')
const conf = JSON.parse(configFile)

// Helpers
const { generateRandomNumber } = require('./helpers/generator')

// Modules
const { repoAllClothes } = require('./modules/clothes/repositories')
const { generatePaginationBot } = require('./helpers/telegram')

const bot = new Telegraf(conf.TOKEN)
bot.use(session())

const menuOptions = [
    '/Show All Clothes',
    '/Show Used Clothes History',
    '/Show Clothes By Category',
    '/Show Schedule',
    '/Show Wash History',
    '/Show Wishlist',
    '/Show Apps History',
    '/Used a Clothes',
    '/Randomize My Outfit',
    '/My Outfit Template',

    '/Exit Bot',
];

bot.start( async (ctx) => {
    const userId = ctx.from.id
    ctx.reply(`Please choose an option in Menu:`, 
        Markup.keyboard(menuOptions.map(option => [option])).resize()
    );
});

bot.on('message', async (ctx) => {
    // Respond / Presenting data
    const present_respond = ['Showing','Let me show you the',"Here's the","I got the","See this"]

    const telegramId = ctx.from.id

    if (!ctx.session) ctx.session = {}

    if (ctx.message.text) {
        const message = ctx.message.text
        const idx_rand_present = generateRandomNumber(1,present_respond.length)

        if(message[0] == "/"){
            const index = menuOptions.indexOf(message)
            let msg, page

            switch (index) {
                case 0: // Show All Clothes
                    [msg, page] = await repoAllClothes(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} all clothes...\n\n${msg}`, { parse_mode:'HTML'})
                    generatePaginationBot(ctx,page,'/Show All Clothes')
                    break

                default:
                    ctx.reply(`Sorry I'dont know your command`)
                    break
            }
        } else if(message === 'Back to Main Menu'){
            ctx.reply(`Please choose an option in Menu:`, 
                Markup.keyboard(menuOptions.map(option => [option])).resize()
            );
        } else {
            ctx.reply(`Unknown command. Please try again`)
        }
    } 
});

bot.launch().then(() => {
    console.log('Bot started')
}).catch((err) => {
    console.error('Error starting bot:', err)
});
