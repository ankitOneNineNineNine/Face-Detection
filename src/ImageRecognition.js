import React from 'react';
import './ImageRecognition.css'
const ImageRecognition = ({imageUrl, boxes}) =>{
	console.log(boxes)
	return (
		<div className = 'center ma'>
			<div className = 'absolute mt2'>
			<img id = 'inputimage' src = {imageUrl} width = '500px' height = 'auto' alt = ''/>
			{boxes.map(box=><div className = 'bounding_box' style = {{top: box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>)}
			
			</div>
		</div>
		);


}
export default ImageRecognition;