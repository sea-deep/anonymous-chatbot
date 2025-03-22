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
    type: "message",
    execute: (ctx, bot) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        if (!bot.runningChats.includes((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id)) {
            return ctx.reply("You are not in a chat...\n\nUse /search to start a new chat.");
        }
        let partner = bot.getPartner((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id);
        let sent;
        if ('reply_to_message' in ctx.message) {
            let messageId = (_c = ctx.message.reply_to_message) === null || _c === void 0 ? void 0 : _c.message_id;
            let messageMap;
            messageMap = bot.messageMap.get(partner);
            if (messageMap) {
                let replyMessageId = messageMap[messageId];
                if (replyMessageId) {
                    sent = yield ctx.copyMessage(partner, { reply_parameters: { message_id: replyMessageId } });
                }
                else {
                    sent = yield ctx.copyMessage(partner);
                }
            }
            else {
                sent = yield ctx.copyMessage(partner);
            }
        }
        else {
            sent = yield ctx.copyMessage(partner);
        }
        if (sent) {
            let messageMap = bot.messageMap.get((_d = ctx.from) === null || _d === void 0 ? void 0 : _d.id);
            if (!messageMap) {
                messageMap = {};
            }
            messageMap[sent.message_id] = ctx.message.message_id;
            bot.messageMap.set((_e = ctx.from) === null || _e === void 0 ? void 0 : _e.id, messageMap);
            let partnerMessageMap = bot.messageMap.get(partner);
            if (!partnerMessageMap) {
                partnerMessageMap = {};
            }
            partnerMessageMap[ctx.message.message_id] = sent.message_id;
            bot.messageMap.set(partner, partnerMessageMap);
        }
    })
};
