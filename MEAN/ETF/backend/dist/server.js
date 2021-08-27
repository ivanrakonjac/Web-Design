"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnik_1 = __importDefault(require("./model/korisnik"));
const dezurstvo_1 = __importDefault(require("./model/dezurstvo"));
const zamena_1 = __importDefault(require("./model/zamena"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/ETF_DEZURSTVA');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log(" mongo open");
});
const router = express_1.default.Router();
router.route('/login').post((req, res) => {
    let korisnickoIme = req.body.korisnickoIme;
    let lozinka = req.body.lozinka;
    korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': lozinka }, (err, user) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(user);
    });
});
router.route('/getDezurstva').post((req, res) => {
    let korisnickoIme = req.body.korisnickoIme;
    dezurstvo_1.default.find({ 'nastavnik': korisnickoIme }, (err, dezurstva) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(dezurstva);
    });
});
router.route('/getDezurstva').post((req, res) => {
    let korisnickoIme = req.body.korisnickoIme;
    dezurstvo_1.default.find({ 'nastavnik': korisnickoIme }, (err, dezurstva) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(dezurstva);
    });
});
router.route('/getAllNastavnikNames').get((req, res) => {
    korisnik_1.default.find({}, (err, users) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(users);
    });
});
router.route('/getNastavnikName').post((req, res) => {
    let korisnickoIme = req.body.korisnickoIme;
    korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, user) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(user);
    });
});
router.route('/addZamena').post((req, res) => {
    let z = new zamena_1.default(req.body);
    z.save().then(z => {
        res.status(200).json({ 'status': 200 });
    }).catch(err => {
        res.status(400).json({ 'status': 400 });
    });
});
router.route('/getAllZamene').get((req, res) => {
    zamena_1.default.find({}, (err, zamene) => {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(zamene);
    });
});
router.route('/deleteZamena').post((req, res) => {
    let dezurstvoZeljeno = req.body.dezurstvoZeljeno;
    zamena_1.default.remove({ 'dezurstvoZeljeno': dezurstvoZeljeno }).then(z => {
        res.status(200).json({ 'status': 200 });
    }).catch(err => {
        res.status(400).json({ 'status': 400 });
    });
});
;
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map