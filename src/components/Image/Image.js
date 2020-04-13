import React from 'react';
import './Image.css';

const Image = ({ imageUrl, boxes, concepts }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        { 
          boxes.map(box =>
            <div key={`box${box.topRow}${box.rightCol}`}
                className='bounding-box'
                style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
            </div>
          )
        }
        { 
          concepts.map((concept,idx) =>
            <div key={idx} className="white f3">
              <strong>{concept.name}</strong> &#x000BB; {(concept.value*100).toFixed(2)}%
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Image;