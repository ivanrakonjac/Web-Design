import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Narudzbina = new Schema({
    id: {
        type: Number
    },
    narudzbine: {
        type: Array
    }
})

export default mongoose.model('Narudzbina', Narudzbina, 'narudzbine');