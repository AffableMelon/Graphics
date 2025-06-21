import { BoxGeometry, Group, Mesh, MeshStandardMaterial, SRGBColorSpace, TextureLoader, TorusGeometry } from "three";
import { createMaterialNew } from "../util/createMeshWithTexture";

function createDesk() {
    const tableTextureFiles = {
    albedo: 'table/dark-wood-stain_albedo.webp',
    normal: 'table/dark-wood-stain_normal-ogl.webp',
    metallic: 'table/dark-wood-stain_metalic.webp', 
    ao: 'table/dark-wood-stain_ao.webp', 
    height: 'table/dark-wood-stain_height.webp' 
};

    const decor = {
        albedo: 'light-gold-unity/lightgold_albedo.webp',
        normal: 'light-gold-unity/lightgold_normal-ogl.webp',
        metallic: 'light-gold-unity/lightgold_metalic.webp', 
    };
    const deskMaterial = createMaterialNew(tableTextureFiles);
    
    const legDecor = createMaterialNew(decor);


    // Desk Group
    const deskGroup = new Group();
  	deskGroup.name = "DeskGroup";
    // Desk Top
    const deskTopWidth = 10;
    const deskTopDepth = 6;
    const deskTopHeight = 0.5;

    const deskTop = new Mesh(
        new BoxGeometry(deskTopWidth, deskTopHeight, deskTopDepth),
        deskMaterial
    );
    deskTop.position.set(0, 0, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
	deskTop.name = "DeskTop";
    deskGroup.add(deskTop);

    // Desk Legs Group
    const deskLegGroup = new Group();
deskLegGroup.name = "DeskLegs";
    // Leg Dimensions
    const legWidth = 0.8;
    const legDepth = 0.8;
    const legHeight = 4.5; 

    // Common leg mesh
    const legGeometry = new BoxGeometry(legWidth, legHeight, legDepth);
    const leg = new Mesh(legGeometry, deskMaterial);
    leg.castShadow = true;
    leg.receiveShadow = true;

    // Leg Neck (Decoration)
    const legNeckGeometry = new BoxGeometry(legWidth + 0.2, 0.2, legDepth + 0.2); 
    const legNeck = new Mesh(legNeckGeometry, legDecor);
    legNeck.castShadow = true;
    legNeck.receiveShadow = true;
    legNeck.position.set(0, legHeight / 2 - 0.1, 0);

    // Add neck to leg
    leg.add(legNeck);

    // Leg positioning (relative to the deskTop)
    const legXOffset = deskTopWidth / 2 - legWidth / 2 - 0.5;
    const legZOffset = deskTopDepth / 2 - legDepth / 2 - 0.5;
    const legYPosition = -deskTopHeight / 2 - legHeight / 2; // put leg right under desk

    const leg1 = leg.clone();
    leg1.position.set(legXOffset, legYPosition, -legZOffset);
    const leg2 = leg.clone();
    leg2.position.set(-legXOffset, legYPosition, -legZOffset);
    const leg3 = leg.clone();
    leg3.position.set(legXOffset, legYPosition, legZOffset);
    const leg4 = leg.clone();
    leg4.position.set(-legXOffset, legYPosition, legZOffset);

    deskLegGroup.add(leg1, leg2, leg3, leg4);
    deskTop.add(deskLegGroup);

    // --- Drawers ---
    const numDrawers = 2;
    const drawerWidth = (deskTopWidth / 2.5) - 1; // Fit within half the desk
    const drawerHeight = (deskTopHeight * 2) - 0.2; // Slightly less than desk height to create a gap
    const drawerDepth = deskTopDepth - 1;
	const DRAWER_OPEN_DISTANCE = 2.5;;

    const drawerGroup = new Group();
    drawerGroup.position.set(0, -deskTopHeight / 2 - 0.4, 0); //  put the drawrs right under the desk

    for (let i = 0; i < numDrawers; i++) {
        const drawer = new Mesh(
            new BoxGeometry(drawerWidth, drawerHeight, drawerDepth),
            deskMaterial
        );
        drawer.castShadow = true;
        drawer.receiveShadow = true;

        // position drawers
		drawer.userData.isDrawer = true;
        drawer.userData.isOpen = false; 
        drawer.name = `Desk_Drawer_${i + 1}` 
        const drawerXOffset = (i === 0 ? -1 : 1) * (drawerWidth / 2 + 0.2); 
        drawer.position.set(drawerXOffset, 0, 0); // Relative to drawerGroup
		drawer.userData.initialZPosition = drawer.position.z;
        drawer.userData.openDistance = DRAWER_OPEN_DISTANCE

        // drawer handles 
        const handleGeometry = new BoxGeometry(drawerWidth * 0.4, 0.1, 0.1);
        const handle = new Mesh(handleGeometry, legDecor);
        handle.position.set(0, 0, drawerDepth / 2 + 0.05); 
		  handle.userData.isDrawer = true;
        handle.userData.drawerMesh = drawer;
        handle.name = `Drawer_Handle_${i + 1}`;
        drawer.add(handle);

        drawerGroup.add(drawer);
    }
    deskTop.add(drawerGroup);


    return deskGroup; 
}

export { createDesk }
