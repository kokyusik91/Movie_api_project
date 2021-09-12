import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import {Button} from 'antd'

function Favorite(props) {

    // MovieDetail에서 props로 넘겨준 값들을 각각 할당해준다.

    // movieId랑 userId값을 가져온다.
    const movieId = props.movieId
    const userFrom = props.userFrom

    //무비 상세 정보들
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime
    

    const [FavoriteNumber, setFavoriteNumber] =useState(0)
    // 좋아요를 누른 숫자 
    const [Favorited, setFavorited] =useState(false)
    // 좋아요를 눌렀는지 안눌렀는지 상태

    let variables ={
        userFrom : userFrom,
        //누가 좋아요를 눌렀는지,
        movieId : movieId,
        //어떤 무비를 좋아했는가,
        movieTitle : movieTitle,
        
        moviePost : moviePost,
        movieRunTime : movieRunTime

    }

    useEffect(() => {

        
        
    Axios.post('/api/favorite/favoriteNumber', variables )
    // 서버에다 요청을 할때, 어떤무비의 정보, 어떤사람이 favorite를 했는지 등등 데이터를 담아서 보낸다.
    // variables라는 객체에다 담는다.
        .then(response => {
            // response에 서버에서 처리한 결과값이 담아있다.
            if(response.data.success){
                setFavoriteNumber(response.data.favoriteNumber)
            }else {
                alert('숫자 정보를 가져오는데 실패 했습니다.')
            }
        })

        // 사람들이 특정영화에 favorite을 눌러 그 숫자를 가져온다.
        Axios.post('/api/favorite/favorited', variables )
        .then(response => {
    
            if(response.data.success){
                    setFavorited(response.data.favorited)
            }else {
                alert('정보를 가져오는데 실패 했습니다.')
            }
        })
        
    }, [])

    // 조건에 따라 다른 request를 보내준다.
    const onClickFavorite = () => {
        // 조건 1 : 이미 Favorited 이면!, favorite list에서 영화 목록을 삭제!
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber -1)
                    // 이미 좋아요가 누른 상태이니깐 -1을 해준다.
                    setFavorited(!Favorited)
                    // true면 false로, false면 true로
                }else {
                    alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                }
            })

        }else {
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber+1)
                    // 좋아요가 안눌러진 상태니깐 +1을 해준다.
                    setFavorited(!Favorited)
                    // true면 false로, false면 true로
                }else {
                    alert('Favorite 리스트에서 추가하는 것을 실패했습니다.')
                }
            })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
            {/* 좋아요 Favorited가 true면 이미 눌른 상태니깐, Not Favorite을 보여주고, false 면 좋아요를 안누른 상태니깐, Add to Favortie로 바꿔준다. */}
            {/* 버튼의 숫자는 좋아요를 누른 갯수 FavoriteNumber를 넣어준다. */}
        </div>
    )
}

export default Favorite
