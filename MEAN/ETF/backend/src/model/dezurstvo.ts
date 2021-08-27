import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Dezurstvo = new Schema ({
    id : {
        type: Number
    },
    datumVreme : {
        type: String
    },
    predmet : {
        type: String
    },
    sala : {
        type: String
    },
    nastavnik: {
        type: String
    }
});

export default mongoose.model("Dezurstvo", Dezurstvo, 'dezurstva');