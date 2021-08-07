import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';
import news from './model/news';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/MEAN_STACK');

const conn = mongoose.connection;

conn.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();

router.route('/login').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    console.log(username);
    console.log(password);

    user.findOne({'username':username, 'password': password}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    } )
});

router.route('/register').post((req, res)=>{
    let u = new user(req.body);
    u.save().then(u=>{
        res.status(200).json({'user':'ok'});
    }).catch(err=>{
        res.status(400).json({'user':'no'});
    })
});

router.route('/news').get((req, res)=>{
    news.find({}, (err, news)=>{
        if(err) console.log(err);
        else res.json(news);
    });
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));