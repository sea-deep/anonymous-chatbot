import { Context, NarrowedContext } from "telegraf";
import { Event } from "../Utils/eventHandler";
import { ExtraTelegraf } from "..";
import { Message, Update } from "telegraf/types";

export default {
    type: "message",
    execute: async (ctx: NarrowedContext<Context<Update>, Update.MessageUpdate<Message>>, bot: ExtraTelegraf) => {
        if (!bot.runningChats.includes(ctx.from?.id as number)) {
            return ctx.reply("You are not in a chat...\n\nUse /search to start a new chat.");
        }
        let partner = bot.getPartner(ctx.from?.id as number);
        let sent;
        if ('reply_to_message' in ctx.message) {
            let messageId = ctx.message.reply_to_message?.message_id;
            let messageMap;
            messageMap = bot.messageMap.get(partner);
            if (messageMap) {
                let replyMessageId = messageMap[messageId as number];
                if (replyMessageId) {
                    sent = await ctx.copyMessage(partner, { reply_parameters: { message_id: replyMessageId } });
                } else {
                    sent = await ctx.copyMessage(partner);
                }
            } else {
                sent = await ctx.copyMessage(partner);
            }

        } else {
            sent = await ctx.copyMessage(partner);
        }

        if (sent) {
            let messageMap = bot.messageMap.get(ctx.from?.id as number);
            if (!messageMap) {
                messageMap = {};
            }
            messageMap[sent.message_id] = ctx.message.message_id;
            bot.messageMap.set(ctx.from?.id as number, messageMap);
            let partnerMessageMap = bot.messageMap.get(partner);
            if (!partnerMessageMap) {
                partnerMessageMap = {};
            }
            partnerMessageMap[ctx.message.message_id] = sent.message_id;
            bot.messageMap.set(partner, partnerMessageMap);
        }
    }
} as Event;

