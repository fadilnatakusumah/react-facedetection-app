import React from 'react';
import './FaceRecognition.css';



const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className="center ma mt2 mb5">
            <div className="absolute mt2">
                <img id="imageInput" alt="" src={imageUrl} width="500px" height="auto"/>
                {
                    boxes.map((data, i) => {
                       return <div key={i} className="bounding-box" style={{top: data.topRow, right: data.rightCol, bottom: data.bottomRow, left:data.leftCol}}></div>
                    })
                
                }
            </div>
        </div>
    );
}

export default FaceRecognition;