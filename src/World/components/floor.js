import { PlaneGeometry, MeshStandardMaterial, Mesh } from "three"
import { createMaterial } from "../util/createMeshWithTexture";


function createFloor(width, length) {
	const floorGeometry = new PlaneGeometry(width, length); // 10x10 units wide
	const floorMaterial = createMaterial('light-plank-flooring_albedo.png')
	// new MeshStandardMaterial({ color: 0x888888, roughness: 0.3 });
	const floor = new Mesh(floorGeometry, floorMaterial);

	// Rotate the plane to lie flat on the XZ plane
	floor.rotation.x = -Math.PI / 2;
	floor.receiveShadow = true; // Important for shadows

	return floor
}

export { createFloor }
