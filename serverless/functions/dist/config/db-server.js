"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
let db;
exports.db = db;
if (!global.__db) {
    global.__db = new client_1.PrismaClient({
        errorFormat: "minimal"
    });
}
exports.db = db = global.__db;
//# sourceMappingURL=db-server.js.map