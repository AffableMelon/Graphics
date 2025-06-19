import { createCamera } from "./components/camera"
import { createCube } from "./components/cube";
import { createCylinder } from "./components/cylinder.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene";
import { createRenderer } from "./systems/rendere";
import { Resizer } from './systems/Resizer.js';
import { Loop } from "./systems/loop.js";
import { cameraControls } from "./systems/controls.js";
import { newLight } from "./components/lamp.js";
import { createDesk } from "./components/createDesk.js";
import { createAxesHelper, createGridHelper } from "./components/helpers.js";
import { createFloor } from "./components/floor.js";

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

		const floor = createFloor(40, 40)
		floor.position.y = -3
		const { directionalLight, ambientLight } = createLights();
		const lamp = newLight();
		controls.target.copy(lamp.position)
		console.log(loop.updateables)
		scene.add(lamp, floor, directionalLight, ambientLight);
		// loop.updateables.push(controls, lamp, directionalLight);
		loop.updateables.push(controls, lamp);
		const resizer = new Resizer(camera, renderer, container);
		scene.add(createAxesHelper(), createGridHelper());
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
