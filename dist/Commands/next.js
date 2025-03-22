"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "next",
    description: "Skip the current chat and search for a new one",
    execute: (ctx, bot) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        let reply = "Searching for a chat...";
        if (bot.runningChats.includes((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id)) {
            let partner = bot.getPartner((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id);
            reply = "You skipped the previous chat.\nSearching for a new chat...";
            bot.runningChats = bot.runningChats.filter(id => { var _a; return id !== ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id) && id !== partner; });
            bot.messageMap.delete((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id);
            bot.messageMap.delete(partner);
            yield ctx.telegram.sendMessage(partner, "Your partner has skipped this chat!\nUse /search to start a new chat.");
        }
        if (bot.waiting !== null) {
            bot.runningChats.push(bot.waiting, (_d = ctx.from) === null || _d === void 0 ? void 0 : _d.id);
            yield ctx.telegram.sendMessage(bot.waiting, "Found a chat!\n\nUse /end to leave the chat or use /next to skip the current chat.");
            bot.waiting = null;
            return ctx.reply("Found a new chat!\n\nUse /end to leave the chat or use /next to skip the current chat.");
        }
        bot.waiting = (_e = ctx.from) === null || _e === void 0 ? void 0 : _e.id;
        return ctx.reply(reply);
    })
};
