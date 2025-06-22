import { createCamera } from "./components/camera"

import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene";
import { createRenderer } from "./systems/rendere";
import { Resizer } from './systems/Resizer.js';
import { Loop } from "./systems/loop.js";
import { cameraControls } from "./systems/controls.js";
import { newLight } from "./components/lamp.js";
import { createDesk } from "./components/createDesk.js";
import { createFloor } from "./components/floor.js";
import { Color } from "three";
import gsap from "gsap";

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
		floor.position.y = -5
		const desk = createDesk();
		desk.position.y = -0.25;
		const { directionalLight, ambientLight } = createLights();
		const { lampGroup, spotLight } = newLight();
		controls.target.copy(lampGroup.position)
		console.log(loop.updateables)
		scene.add(desk, lampGroup, floor, directionalLight, ambientLight);
		loop.updateables.push(controls, lampGroup, directionalLight);
		// loop.updateables.push(controls,lampGroup);
		const resizer = new Resizer(camera, renderer, container);
		// scene.add(createAxesHelper(), createGridHelper());

		this.desk = desk;
		this.lampGroup = lampGroup;
		this.spotLight = spotLight; // The actual light source for toggling
		this.bulbMesh = lampGroup.getObjectByName("LightBulb"); // Get the bulb mesh by name
		this.loop = loop

		this._initPartInfoPanel();

	}


	_initPartInfoPanel() {
		const partInfoPanel = document.createElement('div');
		partInfoPanel.id = 'partInfoPanel';
		document.body.appendChild(partInfoPanel);

		// Style the panel (could also be in style.css)
		partInfoPanel.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 8px;
            border-radius: 5px;
            font-family: sans-serif;
            font-size: 14px;
            display: none;
            pointer-events: none;
            z-index: 100;
        `;
	}

	toggleLight(lightMesh, targetState) {
		this.spotLight.visible = targetState; // Toggle actual light source
		// Update bulb mesh emissive color
		if (lightMesh.material && lightMesh.material.emissive) {
			if (this.spotLight.visible) {
				lightMesh.material.emissive.setHex(lightMesh.userData.onStateEmmisiveColor || 0xFFFF88);
			} else {
				lightMesh.material.emissive.setHex(lightMesh.userData.offStateEmmisiveHex || 0x000000); // Black for off
			}
		}
		console.log('Light is now:', this.spotLight.visible ? 'ON' : 'OFF');

		if (this._onLightToggleCallback) {
			this._onLightToggleCallback(this.spotLight.visible);
		}
	}

	setLampLight(hexColor) {
		this.spotLight.visible = true; // Toggle actual light source

		console.log(hexColor)
		if (this.spotLight) {
			this.spotLight.color.setHex(new Color(hexColor).getHex())
			console.log("spotlight color changed ")
		}


		if (this.bulbMesh && this.bulbMesh.material && this.bulbMesh.material.emissive) {
			const newEmissiveColor = new Color(hexColor).getHex();
			this.bulbMesh.material.emissive.setHex(newEmissiveColor);
			this.bulbMesh.userData.onStateEmmisiveColor = newEmissiveColor;
		}
	}

	setLampIntensity(num) {
		this.spotLight.visible = true;
		if (this.spotLight) {
			this.spotLight.intensity = num;
		}
	}
	setDrawerSlide(drawerMesh, value) {
		const initialZ = drawerMesh.userData.initialZPosition;
		drawerMesh.position.z = initialZ + value;
		drawerMesh.userData.isOpen = (value > (drawerMesh.userData.openDistance * 0.1));
	}

	toggleCameraLoop(value) {
		camera.autoRotate = value; // Set the property on the camera object

		if (value) {
			// enable camera loop
			if (!this.loop.updateables.includes(camera)) {
				this.loop.updateables.push(camera);
			}
			controls.enabled = false; // Disable user controls during auto-rotation
		} else {
			const index = this.loop.updateables.indexOf(camera);
			if (index > -1) {
				this.loop.updateables.splice(index, 1);
			}
			controls.enabled = true; // Re-enable user controls
		}
	}

	toggleLampAnimation(value) {
		if (!value) {
			this.lampGroup.userData.isPaused = true
			const currentTime = performance.now() * 0.001;
			this.lampGroup.userData.animationOffset = (currentTime - this.lampGroup.userData.lastFrameTime);
			this.lampGroup.userData.lastFrameTime = currentTime;
		} else {
			this.lampGroup.userData.isPaused = false
		}
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

	getScene() {
		return scene;
	}

	getCamera() {
		return camera;
	}

	getRenderer() {
		return renderer;
	}

	getDesk() {
		return this.desk;
	}

	getLampBulb() {
		return this.bulbMesh; // The mesh you click
	}

	getPointLight() {
		return this.spotLight; // The actual light source
	}

	getScene() {
		return scene;
	}

	getCamera() {
		return camera;
	}

	getRenderer() {
		return renderer;
	}

	getControls() {
		return controls;
	}


}

export { World }
