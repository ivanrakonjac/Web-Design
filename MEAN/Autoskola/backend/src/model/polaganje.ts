import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Polaganje = new Schema ({
    id : {
        type: String
    },
    idPolaganja : {
        type: Number
    },
    idPrijave : {
        type: Number
    },
    brojPoena : {
        type: Number
    },
    datum: {
        type: Date
    },
    polozio: {
        type: Boolean
    },
    inspektor: {
        type: String
    }
});

export default mongoose.model("Polaganje", Polaganje, 'polaganje');