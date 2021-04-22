import Koa, {Context} from 'koa'
import {Wechaty, Contact} from 'wechaty'
import qs from 'querystring'
import Router from 'koa-router'

import {ENV} from './env';

let bot = new Wechaty({
    name: 'wechat-puppet-wechat', // generate xxxx.memory-card.json and save login data for the next login
});

//  二维码生成
function onScan(qrcode: string) {
    console.log('请用浏览器打开以下连接');
    const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
    ].join('');
    console.log(qrcodeImageUrl);
}

// 登录
async function onLogin(user: Contact) {
    console.log(`${user} 成功登录了`);
}

//登出
function onLogout(user: Contact) {
    console.log(`${user} 已经登出`);
}

let filer: Contact | null

async function onReady() {
    // const filer = await bot.Contact.find('File Transfer')
    // filer?.say('hello')
    filer = await bot.Contact.find({name: ENV.NICKNAME})
    console.log('ready')
}

bot.on('ready', onReady)

interface Query {
    txt: string
}

const app = new Koa();
const router = new Router();

router.get('/send/:key', (ctx: Context) => {
    if (ctx.params.key === ENV.KEY) {
        // @ts-ignore
        const query: Query = qs.parse(ctx.querystring)
        filer?.say(query.txt.replace(/\\n/g, "\n"))
        ctx.body = 'ok';
        return
    }
    ctx.status = 403;
})


app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(ENV.PORT);

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot
    .start()
    .then(() => console.log('开始登陆微信'))
    .catch((e: Error) => console.error(e));
