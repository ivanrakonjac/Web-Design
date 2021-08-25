"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./model/user"));
const prijava_1 = __importDefault(require("./model/prijava"));
const polaganje_1 = __importDefault(require("./model/polaganje"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/Autoskola');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(user);
    });
});
router.route('/prijavaZaUsername').post((req, res) => {
    let username = req.body.username;
    prijava_1.default.find({ 'username': username }, (err, prijava) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(prijava);
    });
});
router.route('/polaganjeZaIdPrijave').post((req, res) => {
    let idPrijave = req.body.idPrijave;
    polaganje_1.default.findOne({ 'idPrijave': idPrijave }, (err, polaganje) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(polaganje);
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map