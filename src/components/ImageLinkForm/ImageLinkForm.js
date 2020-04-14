import React from 'react';
import { withRouter } from "react-router";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, location }) => {

  const getHeadingFromUrl = () => {
    switch(location.pathname){
      case '/concepts': return 'Concepts'
      case '/demographics': return 'Demographics'
      case '/apparels': return 'Apparels'
      case '/food': return 'Food'
      case '/celebrity': return 'Celebrity'
      default : return 'Face Detection'
    }
  }

  const getTextFromUrl = () => {
    switch(location.pathname){
      case '/concepts': return 'This Magic Brain will tell you some general concepts about your pictures. Give it a try.'
      case '/demographics': return 'This Magic Brain will give you demographics about your pictures. Give it a try.'
      case '/apparels': return 'This Magic Brain will detect apparels in your pictures. Give it a try.'
      case '/food': return 'This Magic Brain will recognize food in your pictures. Give it a try.'
      case '/celebrity': return 'This Magic Brain will recognize celebrities in your pictures. Give it a try.'
      default : return 'This Magic Brain will detect faces in your pictures. Give it a try.'
    }
  }

  const getExampleFromUrl = () => {
    switch(location.pathname){
      case '/concepts': return 'https://portal.clarifai.com/cms-assets/20180320225539/general-009.jpg'
      case '/demographics': return 'https://portal.clarifai.com/cms-assets/20180320222304/demographics-001.jpg'
      case '/apparels': return 'https://samples.clarifai.com/apparel.jpeg'
      case '/food': return 'https://portal.clarifai.com/cms-assets/20180320212158/food-002.jpg'
      case '/celebrity': return 'https://timesofindia.indiatimes.com/photo/68570699.cms'
      default : return 'http://www.peopleschurch.org/wp-content/uploads/2018/04/iStock-474550332-min.png'
    }
  }
  
  // NOTE : Always do copy image url ,not copy image so that you can paste in input field.
  return (
    <div>
      <p className='f2 mt2 b'> {getHeadingFromUrl().toUpperCase()} </p>
      <p className='f3'> {getTextFromUrl()} </p>
      <p className='f6'>
        {`Eg: ${getExampleFromUrl()}`}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' placeholder={'Enter image url'} type='text' onChange={onInputChange} />
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ImageLinkForm);