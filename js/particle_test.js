var camera, controls;
var scene;
var renderer;
var cubeMesh;

var clock;
var deltaTime;
var start_time;
var particleSystem;

init();
animate();
window.addEventListener( 'resize', onWindowResize);

function init() {

    clock = new THREE.Clock(true);

			 start_time = Date.now();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 50;

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, -1, 1 ).normalize();
    scene.add(light);

    var geometry = new THREE.CubeGeometry( 10, 10, 10);
    var material = new THREE.MeshPhongMaterial( { color: 0x0033ff, specular: 0x555555, shininess: 30 } );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls = new THREE.FlyControls(camera, renderer.domElement);
    document.body.appendChild( renderer.domElement );



    createParticleSystem();
    render();
}

function createParticleSystem() {

    // The number of particles in a particle system is not easily changed.
    var particleCount = 10000;

    // Particles are just individual vertices in a geometry
    // Create the geometry that will hold all of the vertices
    var particles = new THREE.Geometry();

    // Create the vertices and add them to the particles geometry

    var textureLoader = new THREE.TextureLoader();

   textureLoader.load('starrylensclear.png', function(texture) {
    // Create the material that will be used to render each vertex of the geometry
    var particleMaterial = new THREE.PointsMaterial(
            {color: 0xffffff,
             size: Math.random()*10+3,
             map: texture,
             blending: THREE.AdditiveBlending,
             transparent: true,
             depthTest: false,
            });

            for (var p = 0; p < particleCount; p++) {

                var x = Math.random() * 1000 - 400;
                var y = Math.random() * 1000 - 400;
                var z = Math.random() * 1000 - 400;

                // Create the vertex
                var particle = new THREE.Vector3(x, y, z);
                if(particle){

                }


                // Add the vertex to the geometry
                particles.vertices.push(particle);
            }

    // Create the particle system
    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    // return particleSystem;
  });


}


// function animateParticles() {
//     var verts = particleSystem.geometry.vertices;
//     for(var i = 0; i < verts.length; i++) {
//         var vert = verts[i];
//         if (vert.z < -200) {
//             vert.z = Math.random() * 400 - 200;
//         }
//         vert.z = vert.z + (10 * deltaTime);
//     }
//     particleSystem.geometry.verticesNeedUpdate = true;
//
// }

function animate() {
    deltaTime = clock.getDelta();
  //   if(particleSystem){
  //   animateParticles();
  // }

    controls.update(1);
    render();
    requestAnimationFrame( animate );
}


function render() {
    renderer.render( scene, camera );
}


function onWindowResize() {
  camera.aspect = (window.innerWidth / window.innerHeight);
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);

}
