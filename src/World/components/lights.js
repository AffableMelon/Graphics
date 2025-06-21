import { AmbientLight, DirectionalLight, DirectionalLightHelper, HemisphereLight, MathUtils, PointLight, SpotLight } from "three";


function createLights() {
	const radius = 10;
	const height = 10;
	const directionalLight = new DirectionalLight(0xffffff, 1);
	const ambientLight = new HemisphereLight(0xB1E1FF, 0xB97A20, 2,)
	// const directionLightHelper = new DirectionalLightHelper(directionalLight);

	// directionalLight.add(directionLightHelper)
	directionalLight.position.set(5, 10, 0);
	directionalLight.target.position.set(0, 0, 0)
	directionalLight.castShadow = true;
	directionalLight.shadow.mapSize.width = 1024; // Default is 512
    directionalLight.shadow.mapSize.height = 1024; // Default is 512

	// directionalLight.position.set(radius,height,10);
	//	light.target.position.set(10,0,0)
const shadowMapSize = 10; // Adjust this value to fit your scene content
    directionalLight.shadow.camera.left = -shadowMapSize;
    directionalLight.shadow.camera.right = shadowMapSize;
    directionalLight.shadow.camera.top = shadowMapSize;
    directionalLight.shadow.camera.bottom = -shadowMapSize;

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


