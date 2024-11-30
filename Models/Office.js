//Counter model datas of users

const mongoose = require("mongoose");
const CounterShema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    StateRotation:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    },
    StateEndOfRaceTop:{
        type:Boolean,
        default:false
    },
    StateEndOfRaceBottom:{
        type:Boolean,
        default:false
    },
});

module.exports = mongoose.model("office", CounterShema);
