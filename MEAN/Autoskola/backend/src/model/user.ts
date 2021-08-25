import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema ({
    username : {
        type: String
    },
    password : {
        type: String
    },
    ime : {
        type: String
    },
    prezime : {
        type: String
    },
    datumRodjenja: {
        type: Date
    },
    mesto: {
        type: Number
    },
    jeInspektor: {
        type: Boolean
    }
});

export default mongoose.model("User", User, 'korisnik');