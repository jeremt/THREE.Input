
~function () {

var context = new THREE.Context();

context.handleInput = function (event) {
  if (THREE.Input.isMousePressed()) {
    console.log(  "X = ", THREE.Input.getMouseX(),
                ", Y = ", THREE.Input.getMouseY());
  } else if (THREE.Input.isKeyDown("P")) {
    this.cube.scale.x += 0.1;
    this.cube.scale.y += 0.1;    
    this.cube.scale.z += 0.1;    
  } else if (THREE.Input.isKeyDown("M")) {
    this.cube.scale.x -= 0.1;
    this.cube.scale.y -= 0.1;
    this.cube.scale.z -= 0.1;
  } else if (THREE.Input.isKeyPressed("shift+space")) {
    this.cubeHue += event.deltaTime;
    if (this.cubeHue > 1)
      this.cubeHue = 0;
  } else if (THREE.Input.isKeyRepeat("enter", 0.5, event.deltaTime)) {
    console.log("REPEAT ENTER");
  } else {
    var txt = THREE.Input.getTextEntered();
    if (txt)
      console.log(txt)
  }
}

context.updateCube = function (event) {
  this.cube.rotation.x += event.deltaTime;
  this.cube.rotation.y += event.deltaTime;
  this.cube.rotation.z += event.deltaTime;
  this.cube.material.color.setHSL(this.cubeHue, 0.5, 0.5);
}

context.addEventListener("start", function () {

  // Place camera.

  this.camera.position.z = 500;

  // Create lights.

  var ambient = new THREE.AmbientLight(0x202010);
  this.scene.add(ambient);
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 0, 1).normalize();
  this.scene.add(directionalLight);

  // Create simple cube.

  this.cubeHue = 0;
  this.cube = new THREE.Mesh(
    new THREE.CubeGeometry(100, 100, 100),
    new THREE.MeshPhongMaterial({color: 0xffffff})
  );

  this.scene.add(this.cube);

});

context.addEventListener("frame", function (event) {
  this.handleInput(event);
  this.updateCube(event);
});

context.start();

}();