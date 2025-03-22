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
    name: "search",
    description: "Search for a chat",
    execute: (ctx, bot) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        if (bot.runningChats.includes((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id)) {
            return ctx.reply("You are already in a chat!\n\nUse /end to leave the chat or use /next to skip the current chat.");
        }
        if (bot.waiting === ((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id)) {
            return ctx.reply("You are already in the queue!");
        }
        else if (bot.waiting !== null) {
            bot.runningChats.push(bot.waiting, (_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id);
            yield ctx.telegram.sendMessage(bot.waiting, "Found a chat!\n\nUse /end to leave the chat or use /next to skip the current chat.");
            bot.waiting = null;
            return ctx.reply("Found a chat!\n\nUse /end to leave the chat or use /next to skip the current chat.");
        }
        bot.waiting = (_d = ctx.from) === null || _d === void 0 ? void 0 : _d.id;
        return ctx.reply("Searching for a chat...");
    })
};
