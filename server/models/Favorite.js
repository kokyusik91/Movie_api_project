const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    // opbjectId로 movieId, movieTitle 등에 접근 할 수 있다.
    movieId : {
        type : String
    },
    movieTitle : {
        type : String
    },
    moviePost : {
        type : String
    },
    movieRunTime : {
        type : String
    }
}, {timestamps : true})



const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }