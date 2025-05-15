// import * as Three from 'three';
import { BoxGeometry,
  Color,
//  ColorManagement,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
	TubeGeometry, 
    Vector3} from 'three';

const temp = {
	width : 1080,
	height:  720,
}

const container = document.querySelector("#scene-container");
console.log(container.clientWidth)
const scene = new Scene();
scene.background = new Color('skyblue');

const fov = 35;
const aspect = temp.width / temp.height; 
const near = 0.1;
const far = 100;


const camera = new PerspectiveCamera(fov,aspect,near,far);
camera.position.set(2,0,20)

 // const path = new CustomSin
const geo = new BoxGeometry(2,2,2);
 // const geoO = new TubeGeometry(new Vector3(4,4,4));
const mesh = new MeshBasicMaterial({ color: 'white' });

const cube = new Mesh(geo,mesh);

scene.add(cube);

const renderer = new WebGLRenderer();
renderer.setSize(temp.width, temp.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop( animate );
container.appendChild(renderer.domElement);

// renderer.render(scene, camera);


function animate() {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );

}
