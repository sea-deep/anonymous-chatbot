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
    name: "end",
    description: "End the chat",
    execute: (ctx, bot) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (bot.runningChats.includes((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id)) {
            let partner = bot.getPartner((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id);
            bot.runningChats = bot.runningChats.filter(id => { var _a; return id !== ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id) && id !== partner; }); // Remove both users from the runningChats array
            bot.messageMap.delete((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id); // Remove the user from the messageMap
            bot.messageMap.delete(partner); // Remove the partner from the messageMap
            yield ctx.telegram.sendMessage(partner, "Your partner has ended the chat!\nUse /search to start a new chat.");
            return ctx.reply("You ended the chat.\n\nUse /search to start a new chat.");
        }
        else {
            return ctx.reply("You are not in a chat. Use /search to find a chat partner.");
        }
    })
};
