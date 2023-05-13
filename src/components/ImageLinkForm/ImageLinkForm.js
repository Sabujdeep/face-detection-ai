import React from "react";
import './form.css'

const ImageLinkForm = ({ onInputChange, onSubmitButton }) => {
    return (
        <div>
            <p className="f3">
                {'This AI will detect faces in your picture. Give it a Try!'}
            </p>
            <div className="center">
                <div className="center form shadow-5 pa4 br3">
                <input className="f4 pa2 w-70 center " type="tex" onChange={onInputChange} />
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmitButton}>Detect</button>
                </div>
            </div>
        </div>
    );
} 

export default ImageLinkForm;