import React from "react";
import '../App.css';
import mic from '../assets/mic.png';
export default function Navbar(){
    return(
        <nav id="main-navbar">
            <ul>
                <img src={mic} alt="Mic"/>
                <li><a href="#">Speech Emotion Recognition</a></li>
            </ul>
        </nav>
    )
}