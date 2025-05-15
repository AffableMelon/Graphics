import { CylinderGeometry, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshStandardMaterial } from "three";


function createCylinder(){
	const geometry =  new CylinderGeometry(3, 3, 10, 20);

	const material = new MeshStandardMaterial({ color: "pink", wireframe: true});

	const cylinder = new Mesh(geometry, material);

	cylinder.rotation.set(-1,-0.1,0.8)

	return cylinder;

}

export { createCylinder }
