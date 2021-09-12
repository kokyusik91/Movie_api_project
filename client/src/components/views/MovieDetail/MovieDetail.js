import React, {useEffect, useState} from 'react'
import {API_URL , API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/Movieinfo'
import GridCards from '../commons/GridCards'
import {Row} from 'antd'
import Favorite from './Sections/Favorite'

function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    // 상세페이지 요청 API를 완성 시키기 위해서 params를 써서 movieId를 가져온다.
    console.log(props.match)
    const[Movie,setMovie] = useState([])
    const [Casts, setCasts] =useState([])
    const [ActorToggle, setActorToggle] =useState(false)
    // 토글 버튼의 상태를 State를 저장해준다.




    // 돔이 처음 켜졌을때, 동작할 일들을 적어준다.
    useEffect(() =>{
        // Dom 이 로드 되었을때 할 것들을 작성해준다!
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        // 우리가 필요한 API 주소들 : crew 정보들, 무비 상세 정보들 

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
                // 무비 State에 넣어준다.
            })
        // 상세 정보를 fetch를 통해서 가져온다!!!

            fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setCasts(response.cast)
                // 감독말고 Cast정보만 가져와서 cast State에 넣어준다.
            })
        // 크루 정보들을 fetch를 통해서 가져온다!!!    
    }, [])

    const toggleActorView =() =>{
        setActorToggle(!ActorToggle)
        // 클릭하면, Actor 토글이 true 값으로 바뀐다!
    }

    return (
        <div>
            {/* Header */}
            {/* LandingPage와 마찬가지로 따로 MainImage Component를 만들어서 props로 전달해준다. */}
            {Movie &&
            <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}/>
            }   
            
            {/* Body */}

            <div style={{width : '85%', margin : '1rem auto'}}>
                {/* Movie info */}
                <div style ={{display : 'flex', justifyContent : 'flex-end'}}>
                    <Favorite movieInfo = {Movie} movieId = {movieId} userFrom={localStorage.getItem('userId')}/>
                    {/* 모든 무비 정보들, 무비 아이디를 props로 전달해준다. userId는 로컬스토리지에 저장된 key이름이 userId인 value를 가져온다. */}
                </div>

                <MovieInfo movie={Movie}/>
                <br />
                {/* Actors Grid */}
                <div style={{display : 'flex', justifyContent : 'center', margin : '2rem'}}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>
            {ActorToggle && 
            // ActorToggle 이 True 일때만 그리드 카드를 보여준다.
            <Row gutter={[16,16]}>
            {Casts && Casts.map((cast,i)=>{
                return <GridCards i={i} 
                image ={cast.profile_path ?
                        `${IMAGE_BASE_URL}w500${cast.profile_path}`: null}
                characterName = {cast.name}
                />
                })
            }
        
            </Row>
            
            
            }
                

            </div>

        </div>
    )
}

export default MovieDetail
