const { Telegraf } = require('telegraf');
const config = require('./config');

const bot = new Telegraf(config.tokenBotTelegram);

bot.start((context) => {
    console.log(context);
    console.log(context.payload);

    additionalData = ``;
    fullNameUser = context.from.first_name && context.from.last_name ? `${context.from.first_name} ${context.from.last_name}` : ``;
    if(context.payload) {

        payloadReplace = [];
        payloadSplit = context.payload.split(' ');
        payloadSplit.forEach(value => {
            payloadReplace.push(value.replace(',', ''));
        });
        
        payload = payloadReplace.join(', ');
        additionalData = context.payload ? `\nLos argumentos que pasaste son: ${payload}` : ``;
    }

    context.reply(`Bienvenido! ${fullNameUser} ${additionalData}`);
});

bot.help((context) => {
    context.reply('Ayuda');
});

bot.settings((context) => {
    context.reply('Configuraciones');
});

bot.command(['myFirstCommand', 'myfirstcommand'], (context) => {
    context.reply('Mi primer comando personalizado');
});

bot.command('computer', (context) => {
    context.reply('Hey, estoy vendiendo una computadora!');
});

bot.mention('BotFather', (context) => {
    console.log(context);
    context.reply('Haz mencionado al usuario BotFather');
});

bot.phone('+584241385808', context => {
    context.reply('Este es un número de telefono');
});

bot.hashtag('programming', context => {
    context.reply('Este hashtag es tu favorito');
});

bot.hears('Actualizacion', (context) => {
    context.reply('Estás solicitando una actualización');
});

///// DEPRECATED /////
bot.on('text', context => {
    context.reply('Estás escribiendo');
});
///// DEPRECATED /////

bot.launch();