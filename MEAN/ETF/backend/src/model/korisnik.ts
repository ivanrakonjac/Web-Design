import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema ({
    korisnickoIme : {
        type: String
    },
    lozinka : {
        type: String
    },
    ime : {
        type: String
    },
    prezime : {
        type: String
    },
    tip: {
        type: String
    }
});

export default mongoose.model("Korisnik", Korisnik, 'korisnici');