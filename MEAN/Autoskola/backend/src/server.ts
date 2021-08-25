import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';
import prijava from './model/prijava';
import polaganje from './model/polaganje';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Autoskola');

const conn = mongoose.connection;

conn.once('open', () => {
    console.log('mongo open');
})

const router = express.Router();

router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    user.findOne({'username':username, 'password': password}, (err, user)=>{
        if(err) res.status(400).json(err);
        else res.status(200).json(user);
    })
});

router.route('/prijavaZaUsername').post((req, res) => {
    let username = req.body.username;

    prijava.find({'username':username}, (err, prijava)=>{
        if(err) res.status(400).json(err);
        else res.status(200).json(prijava);
    })
});

router.route('/polaganjeZaIdPrijave').post((req, res) => {
    let idPrijave = req.body.idPrijave;

    polaganje.findOne({'idPrijave': idPrijave}, (err, polaganje)=>{
        if(err) res.status(400).json(err);
        else res.status(200).json(polaganje);
    })
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));