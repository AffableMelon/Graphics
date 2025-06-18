import { AmbientLight, DirectionalLight, HemisphereLight, MathUtils, PointLight, SpotLight } from "three";


function createLights() {
	const radius = 10;
	const height = 10;
	const directionalLight = new DirectionalLight(0xffffff, 1);
	const ambientLight = new AmbientLight('white', 0.5);
	directionalLight.position.set(5, 10, 7);
	directionalLight.castShadow = true;
	directionalLight.shadow.mapSize.width = 1024;
	directionalLight.shadow.mapSize.height = 1024;
	directionalLight.shadow.camera.near = 0.5;
	directionalLight.shadow.camera.far = 50;
	directionalLight.shadow.camera.left = -10;
	directionalLight.shadow.camera.right = 10;
	directionalLight.shadow.camera.top = 10;
	directionalLight.shadow.camera.bottom = -10;
	// directionalLight.position.set(radius,height,10);
	//	light.target.position.set(10,0,0)


	directionalLight.radius = radius;
	directionalLight.height = height;
	directionalLight.angle = 0;
	directionalLight.speed = MathUtils.degToRad(15);

	directionalLight.tick = (delta) => {
		directionalLight.angle += delta * directionalLight.speed;

		directionalLight.position.x = directionalLight.radius * Math.cos(directionalLight.angle);
		directionalLight.position.z = directionalLight.radius * Math.sin(directionalLight.angle);

		directionalLight.position.y = directionalLight.height;
	}

	return { directionalLight, ambientLight };
}

export { createLights };


