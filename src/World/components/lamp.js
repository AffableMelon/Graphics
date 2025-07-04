import {
	Group,
	MeshStandardMaterial,
	CylinderGeometry,
	ConeGeometry,
	SphereGeometry,
	Box3,
	Mesh,
	Vector3,
	DoubleSide,
	SpotLight,
	Object3D
} from 'three';
import {  createMaterialNew } from '../util/createMeshWithTexture';
import { degToRad } from 'three/src/math/MathUtils.js';


function newLight() {
	    const rubberized = {
    albedo: 'synth-rubber-unreal-engine/synth-rubber-albedo.webp',
    normal: 'synth-rubber-unreal-engine/synth-rubber-normal.webp',
    metallic: 'synth-rubber-unreal-engine/synth-rubber-metalness.webp', 
    roughness: 'synth-rubber-unreal-engine/synth-rubber-roughness.webp' 
};
	const lampBodyTexture = {
    albedo: 'worn-metal-studs-unity/worn-metal-studs_albedo.webp',
    normal: 'worn-metal-studs-unity/worn-metal-studs_normal-ogl.webp',
    metallic: 'worn-metal-studs-unity/worn-metal-studs_metalic.webp', 
    ao: 'worn-metal-studs-unity/worn-metal-studs_ao.webp', 
    height: 'worn-metal-studs-unity/worn-metal-studs_height.webp' 
};


const hinge2 = {
    albedo: 'light-gold-unity/lightgold_albedo.webp',
    normal: 'light-gold-unity/lightgold_normal-ogl.webp',
    metallic: 'light-gold-unity/lightgold_metalic.webp', 
};


	const lampGroup = new Group();
	const metalMaterial = createMaterialNew(rubberized)
	const ballMaterial = createMaterialNew(hinge2)
	const lampMaterial = createMaterialNew(lampBodyTexture)

	
	const base = new Mesh(
		new CylinderGeometry(0.6, 0.6, 0.2, 32),
		metalMaterial
	);
	base.name = "Thats the base!"
	base.castShadow = true;
	base.position.set(0, 0.1, 0);
	lampGroup.add(base);

	const lowerElbow = new Mesh(
		new SphereGeometry(0.15, 16, 16),
		ballMaterial
	);
	lowerElbow.position.set(0, 0.3, 0)
	lampGroup.add(lowerElbow)
	lowerElbow.name = "Hinges to move around"


	//  a group for the lower arm and everything above it to pivot
	const lowerArmPivot = new Group();
	lowerArmPivot.position.set(0, 0.2, 0);
	lampGroup.add(lowerArmPivot);


	// Lower arm
	const lowerArm = new Mesh(
		new CylinderGeometry(0.1, 0.1, 2.5, 16),
		metalMaterial
	);
	lowerArm.name = "Lower Arm Handle"
	// Adjust position relative to its pivot (lowerArmPivot)
	lowerArm.position.set(0, 1.25, 0); 
	lowerArmPivot.add(lowerArm);
	// Elbow joint (sphere) 
	const midElbow = lowerElbow.clone()
	midElbow.position.set(0.0, 1.25 + 0.15, 0);
	lowerArm.add(midElbow);
	lowerArm.castShadow = true

	// Create a group for the upper arm and lamp head to pivot from the elbow
	const upperArmPivot = new Group();
	upperArmPivot.position.set(0, 1.25 + 0.15, 0); 
	lowerArm.add(upperArmPivot); 

	// Upper arm
	const upperArm = new Mesh(
		new CylinderGeometry(0.1, 0.1, 1.5, 16),
		metalMaterial
	);
	upperArm.name = "Upper Arm Handle"
	upperArm.position.set(0, 0.75, 0);
	upperArmPivot.add(upperArm);
	upperArm.castShadow = true

	// Lamp head group for rotation
	const lampHeadPivot = new Group();
	lampHeadPivot.position.set(0, 0.75, 0);
	upperArm.add(lampHeadPivot);


	const upperElbow = lowerElbow.clone()
	upperElbow.position.set(0, 0, 0); // Position relative to lowerArm, at its top
	lampHeadPivot.add(upperElbow);

	lampMaterial.side = DoubleSide
	// Lamp head (hollowed cone)
	const lampHead = new Mesh(
		new ConeGeometry(0.6, 1, 32, 1, true), 
		lampMaterial
	);
	lampHead.name = " The main lamp head! "
	lampHead.castShadow = true
	lampHead.rotation.z = Math.PI / 2;
	lampHead.position.set(0.5, 0, 0); // Position relative to its pivot
	lampHeadPivot.add(lampHead);

	const spotLight = new SpotLight(0xffffff, 5, 7, Math.PI / 6, 0.4, 1);
	spotLight.position.set(0.3, 0, 0);
	spotLight.castShadow = true
	//target for lamp head
	const lightTarget = new Object3D();
	lightTarget.position.set(1, 0, 0); 
	lampHeadPivot.add(lightTarget);   
	spotLight.target = lightTarget;    
	const bulbMaterial = new MeshStandardMaterial({
		color: 0xfffffc,
		emissive: 0xfffff5,
		emissiveIntensity: 4,
		roughness: 0.4,
		metalness: 0.1
	});

	const bulb = new Mesh(
		new SphereGeometry(0.08, 16, 16),
		bulbMaterial
	);
	bulb.name = "LightBulb"
	bulb.position.set(0.3, 0, 0);
	bulb.userData.isLightBulb = true;
    bulb.userData.lightSource = spotLight; 
    bulb.userData.originalEmissiveHex = bulbMaterial.emissive.getHex();
    bulb.userData.offStateEmmisiveHex = 0x000000;
	lampHeadPivot.add(bulb);
	lampHeadPivot.add(spotLight);

	// const spotLightHelper = new SpotLightHelper(spotLight);
	// lampHeadPivot.add(spotLightHelper);


	// Center the whole group 
	const box = new Box3().setFromObject(lampGroup);
	const center = box.getCenter(new Vector3());
	lampGroup.position.sub(center);

	lampGroup.lowerArmPivot = lowerArmPivot;
	lampGroup.upperArmPivot = upperArmPivot;
	lampGroup.lampHeadPivot = lampHeadPivot;

	lampGroup.userData = {
    isPaused: false,
    animationTime: 0
};

	lampGroup.tick = function(delta) {
    if (this.userData.isPaused) {
        return;
    }

    if (this.userData.animationTime === undefined) {
        this.userData.animationTime = 0;
    }

    this.userData.animationTime += delta;

    const t = this.userData.animationTime;

    this.lowerArmPivot.rotation.z = Math.sin(t * 0.5) * 0.5 + Math.PI / 10;
    this.upperArmPivot.rotation.z = Math.sin(t * 0.8) * 0.7 - Math.PI / 4;
    this.lampHeadPivot.rotation.y = Math.cos(t * 0.6) * 0.4;
    this.lampHeadPivot.rotation.x = Math.sin(t * 0.9) * 0.2;
};

	lampGroup.position.set(0, 0, 0)
	lampGroup.rotation.y = degToRad(-90)
	lampGroup.name = "Lamp"
	return {lampGroup, spotLight};
}

export { newLight }
