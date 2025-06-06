import { CylinderGeometry, MathUtils, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshStandardMaterial } from "three";


function createCylinder(){
	const geometry =  new CylinderGeometry(3, 3, 10, 20);

	const material = new MeshStandardMaterial({ color: "pink", wireframe: false});

	const cylinder = new Mesh(geometry, material);

	cylinder.rotation.set(-1,-0.1,0.8)
	const radpersec = MathUtils.degToRad(45);

	cylinder.tick = (delta, radps = radpersec ) => {
		cylinder.rotation.x += radps * delta;
		cylinder.rotation.y += radps * delta;
		cylinder.rotation.z += radps * delta;
	}


	return cylinder;

}

export { createCylinder }
