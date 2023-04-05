import React, { useContext, useEffect, useState } from 'react'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';


import '../../css/home.css'

import Header from '../header/Header';
import NavbarApp from '../NavBar/NavbarApp';
import Novedades from '../Novedades/Novedades';
import Enlaces from './Enlaces'
import ModalIndex from './ModalIndex';



const Home = (props) => {

    const [showWidgetTwitter, setShowWidgetTwitter] = useState(true)
    const handleShowWidgetTwitter = () => {
        console.log('click on handle')
        if (showWidgetTwitter) {
            setShowWidgetTwitter(false)
        }
        else {
            setShowWidgetTwitter(true)
        }
    }

    useEffect(() => {
        console.log('showWidgetTwitter: ', showWidgetTwitter)
        return () => {
        }
    }, [showWidgetTwitter])

    //useContext
    return (
        <div className="row m-0" >
            <Header />
            <NavbarApp origin={props.location.state} />
            <div className="App" id="homeBody">
                <Novedades />
                <div
                    className="containerTimelineTwitter"
                    style={{display: showWidgetTwitter ? 'block' : 'none' }}
                >
                    <TwitterTimelineEmbed
                        autoHeight
                        sourceType="profile"
                        screenName="CJAkubadaura"
                        noScrollbar
                        noHeader
                        lang='es'
                        // options={{ height: 500 }}
                        // options={{ height: '35vh' }} 
                        className="timeLineTwitter"
                    />
                </div>

                <div id="ilustration"></div>
                <div id="background"></div>
                <ModalIndex origin={props.location.state} />
                <Enlaces handleShowWidgetTwitter={handleShowWidgetTwitter} />
            </div>
        </div>
    )
}

export default Home
