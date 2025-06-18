import { BoxGeometry, MathUtils, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshPhongMaterial, MeshStandardMaterial, SRGBColorSpace, TextureLoader } from "three";

function createMaterial() {

	const textureLoader = new TextureLoader();
	const texture = textureLoader.load('assets/textures/lightgold_albedo.png')
	console.log("loaded texture is: ", texture)
	texture.colorSpace = SRGBColorSpace;
	

	const material = new MeshStandardMaterial({map: texture});

	return material;

}

function createCube(){
	const geometry =  new BoxGeometry(10,10,10);

	const material = createMaterial(); 	

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
