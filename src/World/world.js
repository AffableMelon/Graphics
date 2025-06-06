import { createCamera } from "./components/camera"
import { createCube } from "./components/cube";
import { createCylinder } from "./components/cylinder.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene";
import { createRenderer } from "./systems/rendere";
import { Resizer } from './systems/Resizer.js';
import { Loop } from "./systems/loop.js";

let camera;
let scene;
let renderer;
let loop;

class World {

	constructor (container) {
		camera= createCamera();
		scene = createScene();
		renderer = createRenderer();
		loop = new Loop(camera, scene, renderer);
		container.append(renderer.domElement)

		const cube = createCube();
		const cylinder = createCylinder();
		const light = createLights();


		cube.position.set(10,0,0)
		console.log(loop.updateables)

		scene.add(cylinder);
		scene.add(cube, light);

		loop.updateables.push(cube, light);
		const resizer =  new Resizer(camera, renderer, container);
	}

	render () {
		renderer.render(scene, camera);
	}

	start(){
		loop.start();
	}

	stop() {
		loop.stop();
	}

}

export { World }
