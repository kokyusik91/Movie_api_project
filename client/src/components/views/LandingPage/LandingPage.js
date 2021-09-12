/* eslint-disable */
import { FaCode } from "react-icons/fa";
import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'
import {Row} from 'antd'


function LandingPage() {
    const[Movies,setMovies] =useState([])
    const[MainMovieImage, setMainMovieImage] = useState(null)
    const[CurrentPage,setCurrentPage] =useState(0)

    useEffect(()=> {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        // 백틱을 이용하여, endpoint에 api key를 저장한다. (최신순 영회 api)
        // 이 주소는 page=1 페이지 1번
        fetchMovies(endpoint)
        
    }, [])

    const fetchMovies = (endpoint) =>{

        fetch(endpoint)
        .then(response => response.json())
        // fetch를 쓰면 response를 json형태로 바꾸어서 받는다!!! 
        .then(response => {
            console.log(response)
            setMovies([...Movies, ...response.results])
            // 영화 리스트들을 setMovies안에 넣어준다 => Movies로 바뀜.
            // 모르겠다. ...Movies, 왜하는지 누적할려고 하긴 한다는데 모르겠다.
            // 먼저 있던 ...Movies에 ...response.results를 추가하는 문법.
            setMainMovieImage(response.results[0])
            // 메인 이미지를 따로 state로 관리. movie 데이터의  인덱스 0번째 데이터를 쓸거임.
            setCurrentPage(response.page)
            // 첫페이지는 "1"
        })
    }

    const loadMoreItems =() =>{
        //버튼을 눌렀을때 page가 2번으로 되면 된다!!!!
        // 또 누르면 page 가 1씩증가.
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`
        fetchMovies(endpoint)
        console.log(Movies)
    }


    return (
    <> 
        <div style={{width : '100%', margin : '0'}}>

        {/* MainImage Component  */}
            {MainMovieImage &&
            <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview}/>
            }
            {/* Mainimage Component에 image, title, text를 뿌려준다. */}

            <div style={{width : '85%', margin : '1rem auto'}}> 
            
                <h2>Movies by latest</h2>
                <hr/>
            {/* Movie card Grid  */}

            <Row gutter={[16,16]}>
                {Movies && Movies.map((movie,i)=>{
                    // 무비 데이터가 있으면 무비 데이터 갯수만큼 반복문을 돌려서, grid card를 만들어준다.
                    return <GridCards key={i}
                    landingPage
                    image ={movie.poster_path ?
                            `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                    // movie데이터의 poster_path가 있으면 imageurl을 보여주고 없으면 null값 처리        
                    movieId ={movie.id}
                    movieName = {movie.original_title}
                    />

                    })
                }
            </Row>
            </div>

            <div style={{display : 'flex', justifyContent : 'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>

        </div>
    </>
    )
}

export default LandingPage
