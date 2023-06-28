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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMindsDB = void 0;
const mindsdb_js_sdk_1 = __importDefault(require("mindsdb-js-sdk"));
function connectMindsDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = process.env.MINDSDB_USER;
            const password = process.env.MINDSDB_PASSWORD;
            const res = yield mindsdb_js_sdk_1.default.connect({
                user,
                password
            });
            // const query = `SELECT * FROM abuse_detection WHERE comment='I want to cry, because of your stupdity';`;
            // const queryResult = await MindsDB.SQL.runQuery(query);
            // console.log(queryResult.rows[0]?.sentiment_explain, isToxic);
        }
        catch (error) {
            // Failed to authenticate.
            console.log(error);
        }
    });
}
exports.connectMindsDB = connectMindsDB;
//# sourceMappingURL=mindsDB-server.js.map