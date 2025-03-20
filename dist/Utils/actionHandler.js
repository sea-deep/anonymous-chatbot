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
const glob_1 = require("glob");
const node_url_1 = require("node:url");
const index_1 = require("../index");
function loadActions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Files = yield (0, glob_1.glob)(`${process.cwd()}/dist/Actions/**/*.js`);
            for (let file of Files) {
                file = (0, node_url_1.pathToFileURL)(file).toString();
                const actionFile = (yield import(file)).default;
                const action = actionFile.default;
                if (action.disabled)
                    continue;
                const actionName = action.name;
                if (!actionName)
                    continue;
                try {
                    index_1.bot.action(actionName, (ctx) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            yield action.execute(ctx, index_1.bot);
                        }
                        catch (err) {
                            console.error(`[ActionHandler] - Error in "${actionName}":\n`, err);
                        }
                    }));
                }
                catch (error) {
                    console.error(`[ActionHandler] -`, error);
                }
            }
            console.info(`[INFO] - Actions Loaded`);
        }
        catch (err) {
            console.error(`[ActionHandler] -`, err);
        }
    });
}
loadActions();
