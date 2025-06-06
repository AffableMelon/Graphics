import { World } from "./World/world";


function main() {
	const container = document.querySelector("#scene-container");
	console.log("Initial container height:", container.clientHeight);
	const world = new World(container);
	world.start();
}

main();

