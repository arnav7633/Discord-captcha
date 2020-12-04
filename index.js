"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const gen = async (member, roleid) => {
    const response = await axios_1.default.get('https://api.no-api-key.com/api/v2/captcha');
    console.log(response.data.captcha);
    const channel = await member.send(response.data.captcha);
    const filter = m => m.author.id === member.id;
    const collecter = channel.channel.createMessageCollector(filter, { time: 15000, max: 1 });
    collecter.on('end', resp => {
        console.log(resp.size);
        resp.forEach((val) => {
            console.log(val.content);
            let ans = (val.content === response.data.captcha_text) ? true : false;
            if (ans == true) {
                member.roles.add(roleid);
                member.send(`You have been verified in **${member.guild.name}**`);
            }
            else {
                member.send('Verification failed!');
            }
        });
    });
};
module.exports.gen = gen;
