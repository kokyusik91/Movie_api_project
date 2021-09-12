const express = require('express');
const router = express.Router();
const {Favorite} =require('../models/Favorite')
// favorite 모델을 가져온다.

// movie 정보들은 req에 담겨져있다.
router.post('/favoriteNumber', (req,res) =>{
    // 몽고 db에서 favorite 숫자를 가져오기
    Favorite.find({"movieId" : req.body.movieId})
    // "movieId"는 favorite schema model에 있는 거고, req.body.movieId는 프론트에서 보내온 movieId 입니다.
    // 그래서 두 movieId가 같은 정보를 찾아줘라. ex) 3사람이 어떤 영화를 좋아요를 눌렀으면, [data1,data2,data3] 이렇게 info에 저장된다.
        .exec((err,info) => {
            //info 안에 정보가 들어가 있음.
            if(err) return res.status(400).send(err)
    // 그다음에 프론트에 다시 숫자 정보를 보내주기 에러 or 성공
            res.status(200).json({success : true, favoriteNumber : info.length })
            // favoriteNumber에 그 [data1,data2,data3]의 length 만큼 담아서 보내주면된다.
        })
})

router.post('/favorited', (req,res) =>{
    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에 넣었는지 확인!
    Favorite.find({"movieId" : req.body.movieId, 'userFrom' : req.body.userFrom})
        .exec((err,info) => {
            // db에서 movieId,userFrom에 해당하는 정보가 있으면! 이미 누른상태 / 없으면 안누른 상태
            if(err) return res.status(400).send(err)
    // 그다음에 프론트에 다시 숫자 정보를 보내주기 
            
            // 내가 아직 이 영화를 favorite 리스트에 넣지 않았다!
            let result = false;
            if(info.length !=0){
                result = true
            }
            res.status(200).json({success : true, favorited: result })
            // 결국 favorited에는 true or false 값이 들어있을 것!
        })
})



// 조건 1 : 특정영화가 이미 Favorited 상태이면, 특정영화 리스트를 삭제!
router.post('/removeFromFavorite', (req,res) =>{
    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에 넣어쓴ㄴ지 확인
    Favorite.findOneAndDelete({movieId : req.body.movieId, userFrom : req.body.userFrom})
    // delete할때 어떤 정보를 조건에 만족하는지, 만족하면 지워준다.
    .exec((err, doc)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success : true, doc})
    })
})




// 조건 2 : 특정영화가 !Favorited 일때, 특정영화 리스트를 추가!
router.post('/addToFavorite', (req,res) =>{
    // 프론트에서 보내준 varibales 정보들을 몽고 db에 넣어준다.
    const favorite =  new Favorite(req.body)  //req.body에는 프론트에서 넘어온 정보들이 들어가있다.
    favorite.save((err, doc) =>{
        //save 명령을 해주면 'favorite'이라는 collection에 정보들이 저장된다.
        if(err) return res.status(400).send(err)
        return res.status(200).json({success : true})
    })
    
})


router.post('/getFavoredMovie', (req,res) =>{
    Favorite.find({'userFrom' : req.body.userFrom})
    //userId가 같은 것들에 해당하는 영화 정보들을 프론트에 넘겨준다.
        .exec((err,favorites)=>{  // 영화 정보들은 favorites에 담겨져있다. [data1,data2] 이렇게 배열행태로 되있다.
            if(err) return res.status(400).send(err)
            return res.status(200).json({success : true, favorites})
        })
})


router.post('/removeFromFavorite', (req,res) =>{
    Favorite.findOneAndDelete({movieId : req.body.movieId, userFrom : req.body.userFrom })
    // 프론트에서 보낸 movieId, userFrom에 맞는 정보를 몽고db에서 지움.
        .exec((err,result) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success : true, result})
            // 
        })
    
})







module.exports = router;
