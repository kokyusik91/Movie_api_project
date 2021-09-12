import React from 'react'
import {Col} from 'antd'
import LandingPage from '../LandingPage/LandingPage'

function GridCards(props) {
    // landing Page 부분 GridCard 부분에 landingPage라는 props를 추가로 전달해주고,
    // landing Page가 true면, 카드를 눌렀을때, movieId가 포함된 주소로 넘어가게 해준다.
    if(props.landingPage){
        return (
            <div>
                <Col lg={6} md={8} xs={24}>
                    <div style={{position : 'relative'}}>
                        <a href={`/movie/${props.movieId}`}>
                            {/* movieId로 넘어가기 때문에 필요! */}
                            <img style={{width : '100%', height : '400px'}}src={props.image} alt={props.movieName}/>
                        </a>
                    </div>
                </Col>
            </div>
        )
    // landing Page가 아니면, 그냥 카드 이미지만 보여준다!
    }else{
        return(
                <Col lg={6} md={8} xs={24}>
                    <div style={{position : 'relative'}}>
                            <img style={{width : '100%', height : '400px'}} src={props.image} alt={props.characterName}/>
                    </div>
                </Col>
        )
    }
    
}

export default GridCards
