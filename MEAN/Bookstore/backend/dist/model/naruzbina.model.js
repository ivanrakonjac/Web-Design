"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Narudzbina = new Schema({
    id: {
        type: Number
    },
    narudzbine: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Narudzbina', Narudzbina, 'narudzbine');
//# sourceMappingURL=naruzbina.model.js.map