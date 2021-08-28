import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';
import nalog from './model/nalog';
import deo from './model/deo';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/Servis");
const conn = mongoose.connection;

conn.once('open', ()=>{
    console.log("Konekcija sa bazom je uspesna");
})


const router = express.Router();

router.route('/login').post((req, res)=>{
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let tip = req.body.tip;

    user.findOne({'kor_ime':kor_ime, 'lozinka': lozinka, 'tip': tip}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    } )
});

router.route('/addNalog').post((req, res)=>{
    let n = new nalog(req.body);

    n.save().then(n=>{
        res.status(200).json({'status':'ok'});
    }).catch(err=>{
        res.status(400).json({'status':'no'});
    })
});

router.route('/getLastIdNaloga').get((req, res)=>{

    nalog.findOne().sort({id:-1}).limit(1).then(n=>{
        res.status(200).json(n);
    }).catch(err=>{
        res.status(400).json(err);
    })
});

router.route('/getSveDelove').get((req, res)=>{
    deo.find({}, (err, delovi)=>{
        if(err) console.log(err);
        else res.json(delovi);
    } )
});

router.route('/getNalogByServiser').post((req, res)=>{
    let serviser = req.body.serviser;

    nalog.find({'serviser': serviser}, (err, nalozi)=>{
        if(err) console.log(err);
        else res.json(nalozi);
    } )
});

router.route('/incBrDelovaNaStanju').post((req, res)=>{
    let naziv = req.body.naziv;
    let incNum = req.body.incNum;

    deo.collection.updateOne({'naziv': naziv}, {$inc: {'stanje': -incNum}})
    res.json({'poruka': 'OK'});
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));