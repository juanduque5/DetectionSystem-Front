import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return(
		<div className ='ma4 mt0'> 
	      <Tilt className="Tilt br2 shadow-2" style={{height: 150, width: 150}}>
		      <div>
		        <img style={{paddingTop: '22px'}} src={brain} alt="description" /> 
		      </div>
	     </Tilt>
		</div> 
	);
}

export default Logo;