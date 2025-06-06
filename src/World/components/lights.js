import { DirectionalLight, MathUtils } from "three";


function createLights(){
	const radius = 1;
	const height = 1;
	const light = new DirectionalLight('0xffffff',2);
	light.position.set(radius,height,1);
	light.target.position.set(10,0,0)


	light.radius = radius;
	light.height = height;
	light.angle = 0; 
	light.speed = MathUtils.degToRad(15);

	light.tick = (delta) => {
		light.angle += delta * light.speed;

		light.position.x = light.radius * Math.cos(light.angle);
		light.position.z = light.radius * Math.sin(light.angle);

		light.position.y = light.height;
	}
	
	return light;
}

export { createLights };


