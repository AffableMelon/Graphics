import { MeshStandardMaterial, NoColorSpace, SRGBColorSpace, TextureLoader } from "three";

function createMaterial(texture_path) {

	const textureLoader = new TextureLoader();
	const texture = textureLoader.load(`assets/textures/${texture_path}`)
	console.log("loaded texture is: ", texture)
	texture.colorSpace = SRGBColorSpace;


	const material = new MeshStandardMaterial({ map: texture });

	return material;

}

export { createMaterial };
