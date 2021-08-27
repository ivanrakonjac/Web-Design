"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Dezurstvo = new Schema({
    id: {
        type: Number
    },
    datumVreme: {
        type: String
    },
    predmet: {
        type: String
    },
    sala: {
        type: String
    },
    nastavnik: {
        type: String
    }
});
exports.default = mongoose_1.default.model("Dezurstvo", Dezurstvo, 'dezurstva');
//# sourceMappingURL=dezurstvo.js.map