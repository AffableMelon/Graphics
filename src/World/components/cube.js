import { BoxGeometry, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshStandardMaterial } from "three";

function createCube(){
	const geometry =  new BoxGeometry(2,2,2, 20, 20, 20);

	const material = new MeshStandardMaterial({color: "lime", wireframe: true, wireframeLinewidth: 20 });

	const cube = new Mesh(geometry, material);

	cube.rotation.set(-1,-0.1,0.8)

	return cube;

}

export { createCube };
