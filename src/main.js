import { SelectionBox } from "three/examples/jsm/Addons.js";
import { World } from "./World/world.js";
import { GUI } from "lil-gui";

// variables for my gui
let gui;
const guiParams = {
  lightOn: true,
  lightColor: "#ffffff",
  lampIntensity: 5,
  cameraReset: () => {},
};

function main() {
  const container = document.querySelector("#scene-container");
  const world = new World(container);

  // Get references to objects that the GUI will control or interact with
  const bulbMesh = world.getLampBulb();
  const pointLight = world.getPointLight();
  const desk = world.getDesk();
  const controls = world.getControls(); // Assuming you add a getControls method to World

  // Pass the interactive elements and GUI params to the World instance for internal management
  // Or, setup GUI here and pass relevant objects to it. Let's set it up here.

  setupGUI(world, desk, bulbMesh, pointLight, controls);

  world.start(); // Start the animation loop
}

function setupGUI(world, desk, bulbMesh, pointLight, controls) {
  gui = new GUI();
  /* 
    The whole idea is instance the controllers then when something happens in the controls like 
    slider or button is pressed
    pass the value and the possible object (three js object)
    to the world methods that modify them
    */
  // Sync up the gui states
  console.log(bulbMesh);
  guiParams.lightOn = pointLight.visible;
  const deskTopMaterial = desk.getObjectByName("DeskTop").material;
  guiParams.deskColor = `#${deskTopMaterial.color.getHexString()}`;
  guiParams.cameraReset = () => {
    controls.reset();
  };

  // lamp light stuff

  const lightFolder = gui.addFolder("Lamp Lighting");
  lightFolder
    .add(guiParams, "lightOn")
    .name("Lamp Light On/Off")
    .onChange((value) => {
      world.toggleLight(bulbMesh, value); // Delegate to World's toggleLight
    });
  lightFolder
    .addColor(guiParams, "lightColor")
    .name("Lamp Light Color ")
    .onChange((value) => {
      world.setLampLight(value);
    });
  lightFolder
    .add(guiParams, "lampIntensity", 0, 100) // Adjust range as needed
    .name("Lamp Light Intensity")
    .onChange((value) => {
      world.setLampIntensity(value);
    });

  // Desk drawer stuff
  const deskFolder = gui.addFolder("Desk Drawer Controls");
  const firstDrawer = desk.getObjectByName("Desk_Drawer_1");
  const secondDrawer = desk.getObjectByName("Desk_Drawer_2");
  if (firstDrawer) {
    guiParams.drawerOpenAmount = firstDrawer.userData.isOpen
      ? firstDrawer.userData.openDistance
      : 0;
    deskFolder
      .add(guiParams, "drawerOpenAmount", 0, firstDrawer.userData.openDistance)
      .name("Drawer Slide (1)")
      .onChange((value) => {
        world.setDrawerSlide(firstDrawer, value); // Delegate to World
      });
  }
  if (secondDrawer) {
    guiParams.drawerOpenAmount = secondDrawer.userData.isOpen
      ? secondDrawer.userData.openDistance
      : 0;
    deskFolder
      .add(guiParams, "drawerOpenAmount", 0, secondDrawer.userData.openDistance)
      .name("Drawer Slide (2)")
      .onChange((value) => {
        world.setDrawerSlide(secondDrawer, value); // Delegate to World
      });
  }

  gui.add(guiParams, "cameraReset").name("Reset Camera View");
}

main();
