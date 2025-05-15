import { createCamera } from "./components/camera"
import { createCube } from "./components/cube";
import { createCylinder } from "./components/cylinder.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene";
import { createRenderer } from "./systems/rendere";
import { Resizer } from './systems/Resizer.js';

let camera;
let scene;
let renderer;

class World {

	constructor (container) {
		camera= createCamera();
		scene = createScene();
		renderer = createRenderer();
		container.append(renderer.domElement)

		const cube = createCube();
		const cylinder = createCylinder();
		const light = createLights();


		cube.position.set(10,0,0)

		scene.add(cylinder);
		scene.add(cube, light);

		const resizer =  new Resizer(camera, renderer, container);
	}

	render () {
		renderer.render(scene, camera)
	}
}

export { World }
