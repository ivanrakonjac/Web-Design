import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Prijava = new Schema ({
    id : {
        type: String
    },
    idPrijava : {
        type: Number
    },
    vrsta : {
        type: String
    },
    mesto : {
        type: Number
    },
    username: {
        type: String
    },
    status: {
        type: Number
    }
});

export default mongoose.model("Prijava", Prijava, 'prijava');