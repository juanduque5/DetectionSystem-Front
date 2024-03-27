import React from 'react';
import './FaceRecognition.css';
  
const FaceRecognition = ({imageUrl, box}) => {
	return(
		<div className='center ma'> 
		 <div className='absolute mt2'>
	      	<img id="inputImage" className='image' style={{ display: box.name_1 ? 'block' : 'none'}} alt=' ' src={imageUrl} width= '500px' height= '700px' />
	      	<div className='bounding-box' style={{top: box.topRow_1, right: box.rightCol_1, bottom: box.bottomRow_1, left: box.leftCol_1}}>
	      	  <p className='message1' style={{ display: box.name_1 ? 'block' : 'none' }}>{box.name_1}</p>
	      </div>
	      	<div className='bounding-box2' style={{top: box.topRow_2, right: box.rightCol_2, bottom: box.bottomRow_2, left: box.leftCol_2}}>
	      	  <p className='message2' style={{ display: box.name_2 ? 'block' : 'none' }}>{box.name_2}</p>
	      </div>
	      <div className='bounding-box3' style={{top: box.topRow_3, right: box.rightCol_3, bottom: box.bottomRow_3, left: box.leftCol_3}}>
	      	  <p className='message3' style={{ display: box.name_3 ? 'block' : 'none' }}>{box.name_3}</p>
	      </div>
		</div>     
	 </div>

	);
}

export default FaceRecognition;   