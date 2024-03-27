import React from 'react';


const Rank = ({userName, userEntries}) => {
	return(
		<div> 
	      <div className='light-gray underline f3'>
	      	{`${userName}, Current Rank is...`}
	      </div>
	      <div className='black f1'>
	      	{userEntries}
	      </div>
		</div> 
	);
}

export default Rank;