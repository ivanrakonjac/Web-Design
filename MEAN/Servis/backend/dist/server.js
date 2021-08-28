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
const nalog_1 = __importDefault(require("./model/nalog"));
const deo_1 = __importDefault(require("./model/deo"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/Servis");
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log("Konekcija sa bazom je uspesna");
});
const router = express_1.default.Router();
router.route('/login').post((req, res) => {
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let tip = req.body.tip;
    user_1.default.findOne({ 'kor_ime': kor_ime, 'lozinka': lozinka, 'tip': tip }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/addNalog').post((req, res) => {
    let n = new nalog_1.default(req.body);
    n.save().then(n => {
        res.status(200).json({ 'status': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'status': 'no' });
    });
});
router.route('/getLastIdNaloga').get((req, res) => {
    nalog_1.default.findOne().sort({ id: -1 }).limit(1).then(n => {
        res.status(200).json(n);
    }).catch(err => {
        res.status(400).json(err);
    });
});
router.route('/getSveDelove').get((req, res) => {
    deo_1.default.find({}, (err, delovi) => {
        if (err)
            console.log(err);
        else
            res.json(delovi);
    });
});
router.route('/getNalogByServiser').post((req, res) => {
    let serviser = req.body.serviser;
    nalog_1.default.find({ 'serviser': serviser }, (err, nalozi) => {
        if (err)
            console.log(err);
        else
            res.json(nalozi);
    });
});
router.route('/incBrDelovaNaStanju').post((req, res) => {
    let naziv = req.body.naziv;
    let incNum = req.body.incNum;
    deo_1.default.collection.updateOne({ 'naziv': naziv }, { $inc: { 'stanje': -incNum } });
    res.json({ 'poruka': 'OK' });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map