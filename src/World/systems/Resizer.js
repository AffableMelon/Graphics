
class Resizer {
	constructor( camera, renderer, container){
		console.log(container.clientWidth, container.clientHeight)
		camera.aspect = container.clientWidth / container.clientHeight
		camera.updateProjectionMatrix();

		renderer.setSize(container.clientWidth, container.clientHeight);

		renderer.setPixelRatio(window.devicePixelRatio);
		
	}


}

export { Resizer }; 
