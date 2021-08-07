import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import knjigaModel from './model/knjiga.model';

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


app.use('/',router);
app.listen(4001, () => console.log(`Express server running on port 4001`));