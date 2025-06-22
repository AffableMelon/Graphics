import { Raycaster, Vector2 } from "three";

class Raycast {
  constructor(camera, scene, domElement) {
    this.camera = camera;
    this.scene = scene;
    this.domElement = domElement;

    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
    this.interactiveObjects = [];

    this.infoPanel = document.createElement("div");
    this.infoPanel.style.position = "absolute";
    this.infoPanel.style.background = "rgba(0,0,0,0.7)";
    this.infoPanel.style.color = "white";
    this.infoPanel.style.padding = "5px 10px";
    this.infoPanel.style.display = "none";
    document.body.appendChild(this.infoPanel);

    this.domElement.addEventListener("click", this.onClick.bind(this));
  }

  addInteractive(object) {
    this.interactiveObjects.push(object);
  }

  onClick(event) {
    // Normalize mouse position
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.interactiveObjects,
      true
    );

    if (intersects.length > 0) {
      const selected = intersects[0].object;

      if (selected.userData.isDrawer) {
        let targetDrawer = selected;

        if (selected.userData.drawerMesh) {
          targetDrawer = selected.userData.drawerMesh;
        }

        if (targetDrawer.toggleDrawer) {
          targetDrawer.toggleDrawer();
        }
      }else{

		  this.flashFeedback(selected);
	
		  this.infoPanel.textContent = selected.name || "Unnamed Part";
		  this.infoPanel.style.left = `${event.clientX}px`;
		  this.infoPanel.style.top = `${event.clientY}px`;
		  this.infoPanel.style.display = "block";
	
		  setTimeout(() => {
			this.infoPanel.style.display = "none";
		  }, 1500);
		}
	  }

  }

  flashFeedback(object) {
    const originalColor = object.material.color.clone();
    const originalScale = object.scale.clone();

    object.material.color.set("#ffcc00");
    object.scale.multiplyScalar(1.2);

    setTimeout(() => {
      object.material.color.copy(originalColor);
      object.scale.copy(originalScale);
    }, 300);
  }
}

export { Raycast };
