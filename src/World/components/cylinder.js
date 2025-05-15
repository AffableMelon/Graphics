import { CylinderGeometry, Mesh, MeshBasicMaterial } from "three";


function createCylinder(){
	const geometry =  new CylinderGeometry(3, 3, 10, 30);

	const material = new MeshBasicMaterial();

	const cylinder = new Mesh(geometry, material);

	return cylinder;

}

export { createCylinder }
