import {
	Group,
	MeshStandardMaterial,
	BoxGeometry,
	CylinderGeometry,
	ConeGeometry,
	SphereGeometry,
	Box3,
	Mesh,
	Vector3,
	PointLight,
	MeshPhongMaterial,
	PointLightHelper,
	DoubleSide,
	DirectionalLight,
	DirectionalLightHelper,
	SpotLight,
	SpotLightHelper,
	Object3D
} from 'three';
import { createDesk } from './createDesk';


function newLight() {
	const lampGroup = new Group();
	const metalMaterial = new MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.2 });
	const shadeMaterial = new MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.6, side: DoubleSide });

	const desk = createDesk()
	desk.position.y = -0.25;
	lampGroup.add(desk)
	// Base
	const base = new Mesh(
		new CylinderGeometry(0.6, 0.6, 0.2, 32),
		metalMaterial
	);
	base.position.set(0, 0.1, 0);
	lampGroup.add(base);

	// Create a group for the lower arm and everything above it to pivot
	const lowerArmPivot = new Group();
	lowerArmPivot.position.set(0, 0.2, 0); // Position this pivot on top of the base
	lampGroup.add(lowerArmPivot);

	// Lower arm
	const lowerArm = new Mesh(
		new CylinderGeometry(0.1, 0.1, 2.5, 16),
		metalMaterial
	);
	// Adjust position relative to its pivot (lowerArmPivot)
	lowerArm.position.set(0, 1.25, 0); // Half of its height above the pivot
	lowerArmPivot.add(lowerArm);

	// Elbow joint (sphere) - now child of lowerArm
	const elbow = new Mesh(
		new SphereGeometry(0.15, 16, 16),
		shadeMaterial
	);
	elbow.position.set(0.0, 1.25 + 0.15, 0); // Position relative to lowerArm, at its top
	lowerArm.add(elbow);

	// Create a group for the upper arm and lamp head to pivot from the elbow
	const upperArmPivot = new Group();
	upperArmPivot.position.set(0, 1.25 + 0.15, 0); // Position this pivot at the elbow joint
	lowerArm.add(upperArmPivot); // Make upperArmPivot a child of lowerArm

	// Upper arm
	const upperArm = new Mesh(
		new CylinderGeometry(0.1, 0.1, 1.5, 16),
		metalMaterial
	);
	// Adjust position relative to its pivot (upperArmPivot)
	upperArm.position.set(0, 0.75, 0); // Half of its height above the pivot
	upperArmPivot.add(upperArm);

	// Lamp head group for rotation
	const lampHeadPivot = new Group();
	lampHeadPivot.position.set(0, 0.75, 0); // Position this pivot at the end of the upper arm
	upperArm.add(lampHeadPivot);

	// Lamp head (hollowed cone)
	const lampHead = new Mesh(
		new ConeGeometry(0.6, 1, 32, 1, true), // The 'true' makes it open-ended
		shadeMaterial
	);
	lampHead.rotation.z = Math.PI / 2;
	lampHead.position.set(0.5, 0, 0); // Position relative to its pivot
	// lampHead.geometry.deleteAttribute('normal'); // Remove normals for flat shading or recompute if needed
	// lampHead.geometry.deleteAttribute('uv');    // Remove UVs if not texturing
	// To hollow it out, we don't need to explicitly remove faces if openEnded is true.
	// However, if you wanted a specific cut-out, you'd use BufferGeometry and manipulate vertices/indices.
	// For a standard cone, openEnded is usually sufficient.
	lampHeadPivot.add(lampHead);

	// Add a light inside the lamp head
	// const pointLight = new PointLight("Red", 1,) // Color, intensity, distance
	// // pointLight.position.set(0.6, -0.00001, 0); // Position slightly inside the cone relative to its pivot
	// lampHeadPivot.add(pointLight);
	//
	// // Helper for the light (optional, for visualization during development)
	// const sphereSize = 0.1;
	// const pointLightHelper = new PointLightHelper(pointLight, 0.1);
	// lampHeadPivot.add(pointLightHelper);
	//
	const spotLight = new SpotLight(0xff4444, 1.5, 10, Math.PI / 6, 0.4, 1);
	spotLight.position.set(0.3, 0, 0); // Inside the cone, near the "bulb"

	// Create a target object that stays in front of the lamp head
	const lightTarget = new Object3D();
	lightTarget.position.set(1, 0, 0); // Forward along the local X axis of the cone
	lampHeadPivot.add(lightTarget);    // Add it to the rotating group
	spotLight.target = lightTarget;    // Tell the light to follow this
	const bulbMaterial = new MeshStandardMaterial({
		color: 0xffcccc,
		emissive: 0xff5555,
		emissiveIntensity: 4,
		roughness: 0.4,
		metalness: 0.1
	});

	const bulb = new Mesh(
		new SphereGeometry(0.08, 16, 16),
		bulbMaterial
	);
	bulb.position.set(0.3, 0, 0); // Same as spotlight position
	lampHeadPivot.add(bulb);

	// Add both light and target to lamp head
	lampHeadPivot.add(spotLight);

	// Optional: Helper
	const spotLightHelper = new SpotLightHelper(spotLight);
	lampHeadPivot.add(spotLightHelper);


	// Center the whole group (still a good idea for initial placement)
	const box = new Box3().setFromObject(lampGroup);
	const center = box.getCenter(new Vector3());
	lampGroup.position.sub(center);

	// Store references to the animatable parts for the tick function
	lampGroup.lowerArmPivot = lowerArmPivot;
	lampGroup.upperArmPivot = upperArmPivot;
	lampGroup.lampHeadPivot = lampHeadPivot;
	// lampGroup.pointLight = pointLight; // Store light reference too if you want to animate its properties
	lampGroup.tick = function(delta) {
		// You can use a running time counter if you want animations that are not
		// strictly dependent on delta (e.g., oscillating using Math.sin/cos)
		// or you can accumulate delta for a total time.
		// For simplicity, let's use a shared time variable or directly use delta
		// for properties that should change linearly with time.

		// For time-based oscillations, it's often easier to use a global time
		// or pass it in, but we can manage it locally too.
		// Let's assume a global `clock` or `elapsedTime` if you prefer that.
		// For now, we'll use performance.now() as it's self-contained.
		const time = performance.now() * 0.001; // Get time in seconds

		// Animate lower arm rotation
		this.lowerArmPivot.rotation.z = Math.sin(time * 0.5) * 0.5 + Math.PI / 10;

		// Animate upper arm rotation relative to lower arm
		this.upperArmPivot.rotation.z = Math.sin(time * 0.8) * 0.7 - Math.PI / 4;

		// Animate lamp head rotation
		this.lampHeadPivot.rotation.y = Math.cos(time * 0.6) * 0.4;
		// this.lampHeadPivot.rotation.x = Math.sin(time * 0.9) * 0.2;

		// Example of a subtle light flicker
	};
	return lampGroup;
}

export { newLight }
