import { BoxGeometry, MathUtils, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshPhongMaterial, MeshStandardMaterial } from "three";

function createCube(){
	const geometry =  new BoxGeometry(2,2,2, 20, 20, 20);

	const material = new MeshStandardMaterial({color: "lime", wireframeLinewidth: 20 });

	const cube = new Mesh(geometry, material);

	//cube.rotation.set(-1,-0.1,0.8)
	
	const radpersec = MathUtils.degToRad(30);

	 cube.tick = (delta, radps = radpersec ) => {
		cube.rotation.x += radps * delta;
		cube.rotation.y += radps * delta;
		cube.rotation.z += radps * delta;
	}

	return cube;

}

export { createCube };
