import React from 'react'

import './Daniel.css'

import DanielJpg from '../images/Daniel.jpg'



function Daniel() {
    return (
        <div className="about-me-container">
            <div className="about-me-card">
                <span className="about-me-header">Hi, my name is Daniel.</span><br/><br/>
                <div className="about-me-body">I am a senior at SFSU studying Computer Science. I like making web applications like the one you
                are looking at right now and experimenting with their design. When I am not coding, I enjoy playing/watching basketball and videogames.</div>
                <img className="about-me-img" src={DanielJpg}/>
            </div>
        </div>
    )
}

export default Daniel
