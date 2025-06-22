import { PerspectiveCamera, Vector3 } from "three";


function createCamera() {
	const camera = new PerspectiveCamera(
		35, // fov
		1, // aspect ratio
		0.1, // near clipping
		100, //far clipping
	);

	camera.position.set(10, -2, 20);
	camera.autoRotate = false;
	camera.rotationSpeed = 0.05;
	camera.rotationTarget = new Vector3(0, 0, 0);
	let orbitAngle = 0; // in radians
	const orbitSpeed = 0.15; // radians per second
	const orbitRadius = 10; // fixed distance from origin

	camera.tick = (delta) => {
		orbitAngle += orbitSpeed * delta; // advance angle based on delta

		// Update position on XZ plane
		camera.position.x = Math.cos(orbitAngle) * orbitRadius;
		camera.position.y = Math.abs(Math.sin(orbitAngle) * orbitRadius);
		camera.position.z = Math.sin(orbitAngle) * orbitRadius * 5;

		camera.lookAt(0, 0, 0); // always look at the center
	};

	// camera.tick = (delta) => {
	//
	// 	const time = performance.now() * 0.001; // time in seconds
	//
	// 	const radius = camera.position.length(); // stay at current distance from origin
	// 	const speed = 0.2; // adjust rotation speed (radians per second)
	//
	// 	// Compute new x and z based on circular path
	// 	const angle = time * speed;
	//
	// 	camera.position.x = Math.cos(angle) * radius;
	// 	camera.position.z = Math.sin(angle) * radius;
	//
	// 	camera.lookAt(0, 0, 0); // Always look at the origin
	// };

	// camera.tick = (delta) => {
	// 	if (camera.autoRotate) {
	// 		const distance = camera.position.distanceTo(camera.rotationTarget);
	// 		// const currentAngle = Math.atan2(camera.position.x - camera.rotationTarget.x, camera.position.z - camera.rotationTarget.z);
	// 		const newAngle = currentAngle + (camera.rotationSpeed * delta);
	//
	// 		camera.position.x = camera.rotationTarget.x + distance * Math.sin(newAngle);
	//
	// 		camera.lookAt(camera.rotationTarget);
	// 	}
	// };
	//

	// camera.tick = (delta) => {
	// 	if (camera.autoRotate) {
	// 		const distance = camera.position.distanceTo(camera.rotationTarget);
	// 		const currentAngle = Math.atan2(camera.position.x - camera.rotationTarget.x, camera.position.z - camera.rotationTarget.z);
	// 		const newAngle = currentAngle + (camera.rotationSpeed * delta);
	//
	// 		camera.position.x = camera.rotationTarget.x + distance * Math.sin(newAngle);
	// 		// camera.position.z = camera.rotationTarget.z + distance * Math.cos(newAngle);
	//
	// 		camera.lookAt(camera.rotationTarget);
	// 	}
	// };

	return camera;
}

export { createCamera };
