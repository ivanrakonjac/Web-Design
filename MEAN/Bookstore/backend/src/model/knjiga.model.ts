import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Knjiga = new Schema({
    idK: {
        type: Number
    },
    naslov:{
        type: String
    },
    slika: {
        type: String
    },
    autor: {
        type: String
    },
    brStr: {
        type: Number
    },
    godina: {
        type: Number
    },
    naStanju: {
        type: Number
    }
})


export default mongoose.model('Knjige',Knjiga,'knjige');