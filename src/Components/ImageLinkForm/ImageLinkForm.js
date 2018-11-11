import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className="f4">
                {'This Cat will detect your face in your image, just try it!'}
            </p>
            <div className="center">
                <div className="form center pa3 br3 shadow-5">
                    <input required onChange={onInputChange} className="f5 w-70 center" style={{height: 39}} type='text'/>
                    <button onClick={onButtonSubmit} className="w-30 grow br2 f5 link dib ph3 pv2 mb2 dib black bg-yellow">Detect</button>
                </div>
            </div>
        </div>
    );
}




export default ImageLinkForm;