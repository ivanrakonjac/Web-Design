import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Zamena = new Schema ({
    dezurstvoMoje : {
        type: Number
    },
    dezurstvoZeljeno : {
        type: Number
    }
});

export default mongoose.model("Zamena", Zamena, 'zamene');