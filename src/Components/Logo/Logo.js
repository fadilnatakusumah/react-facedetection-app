import React from 'react';
import Tilt from 'react-tilt';
import cat from './little-cat-vector.png';
import './Logo.css';


const Logo = () => {
    return (
        <div className="" style={{display: 'flex', justifyContent: 'center'}}>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img alt="Logo" src={cat} style={{height: 130}}/>
                </div>
            </Tilt>
        </div>
    );
}




export default Logo;