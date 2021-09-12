import Axios from 'axios'
import React,{useEffect, useState} from 'react'
import './FavoritePage.css'
import {Popover} from 'antd'
import {IMAGE_BASE_URL} from '../../Config'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])
    useEffect(() => {

        fetchFavoredMovie()

        
    }, [])

    const fetchFavoredMovie = () => {

        Axios.post('api/favorite/getFavoredMovie',{userFrom: localStorage.getItem('userId')} )
        // 가져오는 기준은 userId 기준으로 가져온다.
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                setFavorites(response.data.favorites)
                // Favorites안에 좋아요를 누른 영화 정보들을 States안에 넣어준다.
            } else{
                alert('영화정보를 가져오는데 실패했습니다.')
            }
        })

    }
    const onClickDelete = (movieId, userFrom) => {
        const variables ={
            movieId,
            userFrom
        }

        Axios.post('api/favorite/removeFromFavorite', variables)
        // variable을 같이 전달해준다.
            .then(response => {
                if(response.data.success){
                    fetchFavoredMovie()
                    // 없애는 방법은 여러가지 1. 지우고 나서의 새로운 영화 정보를 가져온다.
                }else{
                    alert("리스트에서 지우는데 실패했습니다.")
                }
            })
    }
    const renderCards = Favorites.map((favorite, i)=>{
        // 좋아요 누른 영화 정보들 만큼, 반복문을 돌려준다.

        const content =(
            <div>
                {favorite.moviePost ?
                <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image" 
                // 좋아요 누른 영화 정보에 영화 포스터가 있으면? 영화이미지를 넣어주고 없으면 : "no image" 
            }
            </div>
        )
        return <tr key={i}>
            {/* Favorites State에 담겨진 정보들을 table 안에다가 넣어준다.  movieTitle, RunTime등 */}
        <Popover content = {content} title={`${favorite.movieTitle}`}>    
            <td>{favorite.movieTitle}</td>
        </Popover>
            <td>{favorite.movieRunTime} mins</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
            {/* remove 버튼을 누를때, 그 누를 특정 영화 정보에 해당하는 movieId와 userFrom 을 서버에 넘겨주어야함.  */}
            {/* 인수를 넣을때는 위 처럼 써야함. */}


        </tr>
    })
    return (
        <div style={{width : '85%', margin : '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {/* 변수에다가 할당해서 넣어줌. */}
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
