"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isToxicFunc = void 0;
function isToxicFunc(toxic) {
    const values = Object.values(toxic);
    return values.some((value) => value > 0.8);
}
exports.isToxicFunc = isToxicFunc;
//# sourceMappingURL=helpers.js.map