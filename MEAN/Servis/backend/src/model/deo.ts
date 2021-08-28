import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Deo = new Schema({
    naziv: {
        type: String
    },
    stanje: {
        type: Number
    }
});

export default mongoose.model('Deo', Deo, 'delovi');