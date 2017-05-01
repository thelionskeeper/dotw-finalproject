var camera, scene, renderer, controls, spotlight;
var geometry, material, mesh;
var largepetal=[];

function init() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);
  camera.position.set(-100, 400, 500);
  scene.add(camera);

  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(-100, -50,50); // location x, y, z
  scene.add(light);

  var light2= new THREE.PointLight(0xF203FE,1);
  light2.position.set(0,0,0);
  scene.add(light2);

  var loader = new THREE.BufferGeometryLoader();

  var modelMaterial = new THREE.MeshLambertMaterial({color:0xff0000,side: THREE.DoubleSide});
  for(var i=0;i<7;i++){

        loader.load('singlepetal.json', function(modelGeometry) {
          largepetal = new THREE.Mesh(modelGeometry,modelMaterial);
          largepetal.scale.set(60,60,60);
          largepetal.position.y = 250-i*(50);
          largepetal.position.x =(Math.random()-.5)*400-200;
            largepetal.position.z =(Math.random()-.5)*400;
          largepetal.rotation.y = (Math.random()-.5)*400;
          largepetal.updateMatrix();
          largepetal.MatrixAutoUpdate = false;

          scene.add(largepetal);
        });
      }
      renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      var container=document.getElementById('container');
      container.appendChild(renderer.domElement);

    }


  init();
  animate();

  function animate(){
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
        controls.update();
  }
