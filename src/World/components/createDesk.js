import { BoxGeometry, Mesh, MeshStandardMaterial, SRGBColorSpace, TextureLoader } from "three";
import { createMaterial } from "../util/createMeshWithTexture";


function createDesk() {
	// const metalMaterial = new MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.2 });
	const deskMaterial = createMaterial('dark-wood-stain_albedo.png')
	// Desk
	const desk = new Mesh(
		new BoxGeometry(10, 0.5, 6),
		deskMaterial
	);
	desk.position.set(0, -5, 0); // so top of desk is at y = 0
	desk.castShadow = true;
	desk.receiveShadow = true
	// lampGroup.add(desk);

	return desk;

}

export { createDesk }
