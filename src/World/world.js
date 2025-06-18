import { createCamera } from "./components/camera"
import { createCube } from "./components/cube";
import { createCylinder } from "./components/cylinder.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene";
import { createRenderer } from "./systems/rendere";
import { Resizer } from './systems/Resizer.js';
import { Loop } from "./systems/loop.js";
import { cameraControls } from "./systems/controls.js";
import { createController } from "./components/controller.js";
import { createGiraffe } from "./components/giraffe.js";
import { newLight } from "./components/lamp.js";
import { createDesk } from "./components/createDesk.js";

let camera;
let scene;
let renderer;
let loop;
let controls;

class World {

	constructor(container) {
		camera = createCamera();
		scene = createScene();
		renderer = createRenderer();
		controls = cameraControls(camera, renderer.domElement);
		loop = new Loop(camera, scene, renderer);
		container.append(renderer.domElement)

		const wall1 = createCube();
		const cylinder = createCylinder();
		const { directionalLight, ambientLight } = createLights();
		const desk = createDesk();
		const lamp = newLight();
		wall1.position.set(20, 0, 0)
		// controls.target.copy(lamp.position)

		console.log(loop.updateables)

		scene.add();
		scene.add(lamp, directionalLight, ambientLight);
		// scene.add(directionalLight, ambientLight);
		loop.updateables.push(lamp, controls, directionalLight);
		// loop.updateables.push(wall1, cylinder, controls);
		const resizer = new Resizer(camera, renderer, container);
	}

	render() {
		renderer.render(scene, camera);
	}

	start() {
		loop.start();
	}

	stop() {
		loop.stop();
	}

}

export { World }
