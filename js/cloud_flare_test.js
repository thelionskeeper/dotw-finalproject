var camera, scene, renderer, controls, spotlight;
var geometry, material, mesh;

var mouseX = 0, mouseY = 0;
var start_time = Date.now();
var textureFlare0,textureFlare2,textureFlare3;


var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function init() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;



  camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);
  camera.position.set(0, 100, 800);
  scene.add(camera);

  var light2 = new THREE.DirectionalLight(0xffffff,1);
  light2.position.set(0,0,700); // location x, y, z
  scene.add(light2);


  // var light3 = new THREE.PointLight(0xFCBBA8,1);
  // light3.position.set(0,0,-500); // location x, y, z
  // scene.add(light3);
  //  var Helper = new THREE.PointLightHelper(light3, 50); // 50 is helper size
  // scene.add(Helper)

  var loader = new THREE.BufferGeometryLoader();
  var textureLoader = new THREE.TextureLoader();

 // textureLoader.load('cloud2.png', function(texture) {
 //   var mat = new THREE.MeshLambertMaterial({
 //    map: texture,
 //    side: THREE.DoubleSide,
 //    // blending:THREE.AdditiveBlending,
 //    transparent: true,
 //    depthTest: false,
 //  });
 //
 //  for(var i=0; i<40;i+=2){
 //   var planeGeometry = new THREE.PlaneGeometry(1024, 256);
 //    var plane = new THREE.Mesh(planeGeometry, mat);
 //    plane.position.x = Math.random() * 1000 - 500;
 //    plane.position.y = - Math.random() * Math.random() * 200 - 15;
 //    plane.position.z=i+5;
 //    plane.scale.x = plane.scale.y = Math.random() * Math.random() * 4 + 0.5;
 //    scene.add(plane);
 //  }
 //
 //
 //  });

  textureLoader.load('cloud1.png', function(texture) {
    var mat = new THREE.MeshLambertMaterial({
     map: texture,
     side: THREE.DoubleSide,
     transparent: true,
     depthTest: true,
     opacity:Math.random()*.5+.4
   });

   for(var i=1; i<70;i+=2){
    var planeGeometry = new THREE.PlaneGeometry(2048, 512);
     var plane = new THREE.Mesh(planeGeometry, mat);
     plane.position.x = Math.random() * 1000 - 500;
     plane.position.y = Math.random() *150-50;
     plane.position.z=i+400;
     plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
     scene.add(plane);
   }


   });

   var textureLoader = new THREE.TextureLoader();

				 textureFlare0 = textureLoader.load( "lensflare0.png" );
				 textureFlare2 = textureLoader.load( "lensflare2.png" );
				 textureFlare3 = textureLoader.load( "lensflare3.png" );

				addLight( 1, 1, 0.5, -100, 100, 500 );
        addLight( 1, 1, 0.5, 150, 100, 0 );



        textureLoader.load('cloud1.png', function(texture) {
          var mat = new THREE.MeshLambertMaterial({
           map: texture,
           side: THREE.DoubleSide,
          //  blending:THREE.AdditiveBlending,
           transparent: true,
           depthTest: false,
           opacity:Math.random()*.5+.4
         });

         for(var i=1; i<50;i+=2){
          var planeGeometry = new THREE.PlaneGeometry(2048, 512);
           var plane = new THREE.Mesh(planeGeometry, mat);
           plane.position.x = Math.random() * 1000 - 500;
           plane.position.y = Math.random() *180-50;
           plane.position.z=i-200;
           plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
           scene.add(plane);
         }


         });

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);
  renderer.gammaInput = true;
				renderer.gammaOutput = true;

  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );


  document.body.appendChild(renderer.domElement);

}

init();
animate();

function addLight( h, s, l, x, y, z ) {

  var light = new THREE.PointLight( 0xffffff, 1.5, 200);
  light.color.setHSL( h, s, l );
  light.position.set( x, y, z );
  scene.add( light );

  var flareColor = new THREE.Color( 0xFCBBA8 );
  flareColor.setHSL( h, s, l + 0.5 );

  var lensFlare = new THREE.LensFlare( textureFlare0,512, 0.0, THREE.AdditiveBlending, flareColor );

  lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
  lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
  lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

  lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
  lensFlare.add( textureFlare3, 70, 0.5, THREE.AdditiveBlending );
  lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
  lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );

  lensFlare.customUpdateCallback = lensFlareUpdateCallback;
  lensFlare.position.copy( light.position );

  scene.add( lensFlare );

}

function lensFlareUpdateCallback( object ) {

     var f, fl = object.lensFlares.length;
     var flare;
     var vecX = -object.positionScreen.x * 2;
     var vecY = -object.positionScreen.y * 2;


     for( f = 0; f < fl; f++ ) {

       flare = object.lensFlares[ f ];

       flare.x = object.positionScreen.x + vecX * flare.distance;
       flare.y = object.positionScreen.y + vecY * flare.distance;

       flare.rotation = 0;

     }

     object.lensFlares[ 2 ].y += 0.025;
     object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );

   }

function animate(){
  requestAnimationFrame(animate);
  position = ( ( Date.now() - start_time ) * 0.03 ) %1070;

  camera.position.x += ( mouseX - camera.position.x ) * 0.01;
  // camera.rotation.y +=  0.0001;
  camera.position.z = - position + 900;

  renderer.render(scene, camera);
  // controls.update();
}


function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) * 0.25;
  mouseY = ( event.clientY - windowHalfY ) * 0.15;
}


function onWindowResize() {
  myCamera.aspect = (window.innerWidth / window.innerHeight);
myCamera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
}
