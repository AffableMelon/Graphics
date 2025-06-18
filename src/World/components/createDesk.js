import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";


function createDesk() {


	const metalMaterial = new MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.2 });
	const deskMaterial = new MeshStandardMaterial({ color: "white", metalness: 0.2 });
	// Desk
	const desk = new Mesh(
		new BoxGeometry(10, 0.5, 6),
		deskMaterial
	);
	desk.position.set(0, -5, 0); // so top of desk is at y = 0
	// lampGroup.add(desk);

	return desk;

}

export { createDesk }
