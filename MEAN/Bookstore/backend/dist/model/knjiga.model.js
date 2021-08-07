"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Knjiga = new Schema({
    idK: {
        type: Number
    },
    naslov: {
        type: String
    },
    slika: {
        type: String
    },
    autor: {
        type: String
    },
    brStr: {
        type: Number
    },
    godina: {
        type: Number
    },
    naStanju: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Knjige', Knjiga, 'knjige');
//# sourceMappingURL=knjiga.model.js.map