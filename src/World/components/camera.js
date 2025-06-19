import { PerspectiveCamera } from "three";


function createCamera() {
	const camera = new PerspectiveCamera(
		35, // fov
		1, // aspect ratio
		0.1, // near clipping
		100, //far clipping
	);

	camera.position.set(10, -5, 20);

	return camera;
}

export { createCamera };
