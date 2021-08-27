import express from 'express';

import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import korisnik from './model/korisnik';
import dezurstvo from './model/dezurstvo';
import zamena from './model/zamena';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect ('mongodb://localhost:27017/ETF_DEZURSTVA');

const conn = mongoose.connection;

conn.once('open', () => {
    console.log(" mongo open");
})

const router = express.Router();

router.route('/login').post((req, res) => {
    let korisnickoIme = req.body.korisnickoIme;
    let lozinka = req.body.lozinka;

    korisnik.findOne({'korisnickoIme':korisnickoIme, 'lozinka': lozinka}, (err, user)=>{
        if(err) res.status(400).json(err);
        else res.status(200).json(user);
    })
});

router.route('/getDezurstva').post((req, res) => {
    let korisnickoIme = req.body.korisnickoIme;

    dezurstvo.find({'nastavnik':korisnickoIme}, (err, dezurstva)=>{
        if(err) res.status(400).json(err);
        else res.status(200).json(dezurstva);
    })
});

router.route('/getDezurstva').post((req, res) => {
    let korisnickoIme = req.body.korisnickoIme;

    dezurstvo.find({'nastavnik':korisnickoIme}, (err, dezurstva)=>{
        if(err) res.status(400).json(err);
        else res.status(200).json(dezurstva);
    })
});

router.route('/getAllNastavnikNames').get((req, res) => {
    korisnik.find({},(err, users)=>{
        if(err) res.status(400).json(err);
        else res.status(200).json(users);
    })
});

router.route('/getNastavnikName').post((req, res) => {
    let korisnickoIme = req.body.korisnickoIme;

    korisnik.findOne({'korisnickoIme':korisnickoIme}, (err, user)=>{
        if(err) res.status(400).json(err);
        else res.status(200).json(user);
    })
});

router.route('/addZamena').post((req, res) => {
    let z = new zamena(req.body);

    z.save().then(z=>{
        res.status(200).json({'status':200});
    }).catch(err=>{
        res.status(400).json({'status':400});
    })
});

router.route('/getAllZamene').get((req, res) => {

    zamena.find({}, (err, zamene)=>{
        if(err) res.status(400).json(err);
        else res.status(200).json(zamene);
    })
});


router.route('/deleteZamena').post((req, res) => {

    let dezurstvoZeljeno = req.body.dezurstvoZeljeno;

    zamena.remove({'dezurstvoZeljeno': dezurstvoZeljeno}).then(z=>{
            res.status(200).json({'status':200});
        }).catch(err=>{
            res.status(400).json({'status':400});
        })
});





app.use('/',router);
app.listen(4000, () => console.log(`Express server running on port 4000`));