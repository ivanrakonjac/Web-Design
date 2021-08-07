"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const knjiga_model_1 = __importDefault(require("./model/knjiga.model"));
const naruzbina_model_1 = __importDefault(require("./model/naruzbina.model"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/BookStoreDB");
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('Uspesna konekcija');
});
const router = express_1.default.Router();
router.route('/dohvatiSveKnjige').get((req, res) => {
    knjiga_model_1.default.find({}, (err, knjige) => {
        if (err)
            console.log(err);
        else
            res.json(knjige);
    });
});
router.route('/naruci').post((req, res) => {
    let idK = req.body.idK;
    let kolicina = req.body.kolicina;
    knjiga_model_1.default.findOne({ 'idK': idK, 'naStanju': { $gte: kolicina } }, (err, knjiga) => {
        if (err)
            console.log(err);
        else {
            if (knjiga) {
                let nar = {
                    knjiga: idK,
                    kolicina: kolicina,
                    status: 'naruceno'
                };
                naruzbina_model_1.default.collection.updateOne({ "id": 1 }, { $push: { "narudzbine": nar } });
                knjiga.collection.updateOne({ "idK": idK }, { $inc: { 'naStanju': -kolicina } });
                res.json({ 'poruka': 'OK' });
            }
            else {
                res.json({ 'poruka': 'Nema na stanju' });
            }
        }
    });
});
router.route('/dohvatiSveNarudzbine').get((req, res) => {
    naruzbina_model_1.default.find({}, (err, narudzbine) => {
        if (err)
            console.log(err);
        else
            res.json(narudzbine);
    });
});
router.route('/dohvatiKnjigu').post((req, res) => {
    let idK = req.body.idK;
    knjiga_model_1.default.findOne({ "idK": idK }, (err, knjiga) => {
        if (err)
            console.log(err);
        else
            res.json(knjiga);
    });
});
app.use('/', router);
app.listen(4001, () => console.log(`Express server running on port 4001`));
//# sourceMappingURL=server.js.map