"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Polaganje = new Schema({
    id: {
        type: String
    },
    idPolaganja: {
        type: Number
    },
    idPrijave: {
        type: Number
    },
    brojPoena: {
        type: Number
    },
    datum: {
        type: Date
    },
    polozio: {
        type: Boolean
    },
    inspektor: {
        type: String
    }
});
exports.default = mongoose_1.default.model("Polaganje", Polaganje, 'polaganje');
//# sourceMappingURL=polaganje.js.map