const { Telegraf, Markup, session } = require('telegraf')
const fs = require('fs')

const configFile = fs.readFileSync('./configs/telegram.json', 'utf8')
const conf = JSON.parse(configFile)

// Helpers
const { generateRandomNumber } = require('./helpers/generator')

// Modules
const { repoAllClothes, repoAllClothesUsedHistory, repoAllClothesSchedule, repoAllClothesWashHistory, repoLastHistory } = require('./modules/clothes/repositories')
const { generatePaginationBot } = require('./helpers/telegram')
const { repoAllAppsHistory } = require('./modules/history/repositories')
const { repoAllOutfit } = require('./modules/outfit/repositories')
const { repoMostUsedClothes, repoMostUsedDailyClothesPerType } = require('./modules/stats/repositories')

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
    '/Show All Outfit',
    '/Used a Clothes',
    '/Randomize My Outfit',
    '/Show Most Used Clothes',
    '/Show Most Used Clothes for Daily',
    '/Show Last History',

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

                case 1: // Show All Clothes Used History
                    [msg, page] = await repoAllClothesUsedHistory(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} clothes used history...\n\n${msg}`, { parse_mode:'HTML'})
                    generatePaginationBot(ctx,page,'/Show Used Clothes History')
                    break

                case 3: // Show Schedule
                    msg = await repoAllClothesSchedule()
                    ctx.reply(`${present_respond[idx_rand_present-1]} schedule...\n\n${msg}`, { parse_mode:'HTML'})
                    break

                case 4: // Show Wash History
                    [msg, page] = await repoAllClothesWashHistory(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} wash history...\n\n${msg}`, { parse_mode:'HTML'})
                    generatePaginationBot(ctx,page,'/Show Wash History')
                    break

                case 6: // Show Apps History
                    [msg, page] = await repoAllAppsHistory(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} apps history...\n\n${msg}`, { parse_mode:'HTML'})
                    generatePaginationBot(ctx,page,'/Show Apps History')
                    break

                case 7: // Show All Outfit
                    [msg, page] = await repoAllOutfit(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} all outfit...\n\n${msg}`, { parse_mode:'HTML'})
                    generatePaginationBot(ctx,page,'/Show All Outfit')
                    break

                case 10: // Show Most Used Clothes
                    [msg] = await repoMostUsedClothes()
                    ctx.reply(`${present_respond[idx_rand_present-1]} most used clothes...\n\n${msg}`, { parse_mode:'HTML'})
                    break

                case 11: // Show Most Used Clothes for Daily
                    [msg] = await repoMostUsedDailyClothesPerType()
                    ctx.reply(`${present_respond[idx_rand_present-1]} most used clothes...\n\n${msg}`, { parse_mode:'HTML'})
                    break

                case 12: // Show Last History
                    msg = await repoLastHistory()
                    ctx.reply(`${present_respond[idx_rand_present-1]} last history...\n\n${msg}`, { parse_mode:'HTML'})
                    break

                default:
                    ctx.reply(`Sorry I'dont know your command`)
                    break
            }
        } else if(message === 'Back to Main Menu'){
            ctx.reply(`Please choose an option in Menu:`, 
                Markup.keyboard(menuOptions.map(option => [option])).resize()
            );
        } else if (/^Page \d+ - \/Show (All Clothes|Used Clothes History|Wash History|Apps History|All Outfit)$/.test(message)) {
            const parts = message.split(' - ')
            const selectedPage = parseInt(parts[0].split(' ')[1])
            const topic = parts[1]
            ctx.session.currentPage = selectedPage
            let msg, page

            if(topic === '/Show All Clothes'){
                [msg, page] = await repoAllClothes(ctx)
                ctx.reply(`${present_respond[idx_rand_present-1]} all clothes...\n\n${msg}`, { parse_mode:'HTML'})
                generatePaginationBot(ctx, page, '/Show All Clothes')
            } else if(topic === '/Show Used Clothes History'){
                [msg, page] = await repoAllClothesUsedHistory(ctx)
                ctx.reply(`${present_respond[idx_rand_present-1]} clothes used history...\n\n${msg}`, { parse_mode:'HTML'})
                generatePaginationBot(ctx, page, '/Show Used Clothes History')
            } else if(topic === '/Show Wash History'){
                [msg, page] = await repoAllClothesWashHistory(ctx)
                ctx.reply(`${present_respond[idx_rand_present-1]} wash history...\n\n${msg}`, { parse_mode:'HTML'})
                generatePaginationBot(ctx, page, '/Show Wash History')
            } else if(topic === '/Show Apps History'){
                [msg, page] = await repoAllClothesUsedHistory(ctx)
                ctx.reply(`${present_respond[idx_rand_present-1]} apps history...\n\n${msg}`, { parse_mode:'HTML'})
                generatePaginationBot(ctx, page, '/Show Apps History')
            } else if(topic === '/Show All Outfit'){
                [msg, page] = await repoAllOutfit(ctx)
                ctx.reply(`${present_respond[idx_rand_present-1]} all outfit...\n\n${msg}`, { parse_mode:'HTML'})
                generatePaginationBot(ctx, page, '/Show All Outfit')
            } 

            ctx.reply(`Opened page ${selectedPage}`);
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
