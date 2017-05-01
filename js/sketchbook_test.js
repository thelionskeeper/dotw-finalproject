var camera, scene, renderer, controls, spotlight;
var geometry, material, mesh;
var book;
var pages=[];

function init() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);
  camera.position.set(100, 200, 650);
  scene.add(camera);

  // var light = new THREE.DirectionalLight(0xffffff, .7);
  // light.position.set(0, 100,600); // location x, y, z
  // scene.add(light);

  var light2 = new THREE.AmbientLight(0xffffff,.9);
  // light2.position.set(0,-80,0);
  scene. add(light2);

  // var helper= new THREE.DirectionalLightHelper(light, 50);
  // scene.add(helper);

  var loader = new THREE.BufferGeometryLoader();
  var textureLoader = new THREE.TextureLoader();
  var angle = 0;
  var step = (2*Math.PI) / 70;


for(var i=1;i<36;i++){
 textureLoader.load('sketches/page_'+i+'.png', function(texture) {
   var modelMaterial = new THREE.MeshLambertMaterial({map: texture,side: THREE.DoubleSide,  transparent: true,});
// Math.cos(angle)*i-(Math.random()-.5);

  loader.load('page.json', function(modelGeometry) {
    pages[i] = new THREE.Mesh(modelGeometry, modelMaterial);
    pages[i].scale.set(50, 50, 50);
    pages[i].position.x = ((Math.random()-.5) * 800);
    pages[i].position.y = i*Math.random()*5-40;
    pages[i].position.z= ((Math.random()-.5) * 300);
    pages[i].rotation.y=Math.random()*3;
    // console.log(pages[i].position.x+" "+pages[i].position.z);
    scene.add(pages[i]);
    pages[i].updateMatrix();
    pages[i].MatrixAutoUpdate = false;
     angle += step;
  });
});

}


loader.load('book_base.json',function(modelGeometry){
  material= new THREE.MeshLambertMaterial({color:0x000000});
  book=new THREE.Mesh(modelGeometry,material);
  book.scale.set(50,50,50);
  book.position.set(0,-100,0);
  book.receiveShadow=true;
  scene.add(book);
});

textureLoader.load('sketches/cover.png', function(texture) {
loader.load('book_top.json',function(modelGeometry){
  var mat= new THREE.MeshLambertMaterial({map:texture,side: THREE.DoubleSide});
  var top=new THREE.Mesh(modelGeometry,mat);
  top.scale.set(50,50,50);
  top.position.set(0,-100,0);
  top.receiveShadow=true;
  scene.add(top);
});
});
renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;

controls = new THREE.OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

init();
animate();
