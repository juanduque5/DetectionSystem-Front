import React from 'react';

const Navigation = ({routeChange, signUp}) => {
	if(signUp){
		return(
		<nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
         	<p  onClick = {()=> routeChange('Register') } className ='f3 link din black underline pa3 pointer'> Sign Out </p>
		</nav>
	);


	}else {

	return(
		<nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
         	<p  onClick = {()=> routeChange('signIn') } className ='f3 link din black underline pa3 pointer'> Sign In </p>
         	<p  onClick = {()=> routeChange('Register') } className ='f3 link din black underline pa3 pointer'> Register </p>
		</nav>
	);
}
}

export default Navigation;