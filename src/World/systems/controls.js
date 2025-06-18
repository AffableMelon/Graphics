import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function cameraControls(camera, canvas){

	const control = new OrbitControls(camera, canvas);
	control.enableDamping = true;

	control.tick = () => control.update();
	
	return control;


}

export { cameraControls };
