import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import knjigaModel from './model/knjiga.model';
import naruzbinaModel from './model/naruzbina.model';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/BookStoreDB");

const conn = mongoose.connection;

conn.once('open',()=>{
    console.log('Uspesna konekcija')
})

const router = express.Router();

router.route('/dohvatiSveKnjige').get((req, res)=>{
    knjigaModel.find({},(err, knjige)=>{
        if(err) console.log(err);
        else res.json(knjige);
    });
}); 

router.route('/naruci').post((req, res)=>{
    let idK = req.body.idK;
    let kolicina = req.body.kolicina;

    knjigaModel.findOne({'idK':idK, 'naStanju': {$gte: kolicina}}, (err, knjiga)=>{
        if(err) console.log(err);
        else{
            if(knjiga){
                let nar = {
                    knjiga: idK,
                    kolicina: kolicina,
                    status: 'naruceno'
                }
                naruzbinaModel.collection.updateOne({"id":1}, {$push: {"narudzbine": nar}});
                knjiga.collection.updateOne({"idK": idK}, {$inc: {'naStanju':-kolicina}});
                res.json({'poruka': 'OK'});
            }
            else{
                res.json({'poruka': 'Nema na stanju'});
            }
        }
    })
})

router.route('/dohvatiSveNarudzbine').get((req, res)=>{
    naruzbinaModel.find({}, (err, narudzbine)=>{
        if(err) console.log(err);
        else res.json(narudzbine);
    })
})

router.route('/dohvatiKnjigu').post((req, res)=>{
    let idK = req.body.idK;

    knjigaModel.findOne({"idK":idK}, (err, knjiga)=>{
        if(err) console.log(err);
        else res.json(knjiga);
    })
})

app.use('/',router);
app.listen(4001, () => console.log(`Express server running on port 4001`));