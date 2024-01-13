var scene = new THREE.Scene();
let article_name = window.location.pathname.split("/").pop().split('.')[0].split('_')[0];

var container = document.getElementsByClassName('article-pictures')[0];

    // Create a camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    if(window.innerWidth < 380){
        camera.position.z = 3.7;
    }
    if(window.innerWidth > 380 && window.innerWidth <= 400){
        camera.position.z = 3.2;
    }
    if(window.innerWidth > 400){
        camera.position.z = 3;
    }
    if(window.innerWidth > 500){
        camera.position.z = 2.7;
    }
    if(window.innerWidth > 600){
        camera.position.z = 2.5;
    }
    if(window.innerWidth > 800){
        camera.position.z = 2.2;
    }
    if(window.innerWidth > 1024){
        camera.position.z = 1.9;
    }

    // Create a renderer
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create a cutting board geometry
    var geometry = new THREE.BoxGeometry(2, 0.15, 1);

    // Create a material with wood texture (you'll need a wood texture image)
    var texture = new THREE.TextureLoader().load(`../blender/${article_name}.webp`);
    var material = new THREE.MeshStandardMaterial({
        map: texture,
        emissive: new THREE.Color(0x000000), // No emissive color
        color: new THREE.Color(0x333333), // Adjust the base color for darkness
        roughness:0
    });

    hlight = new THREE.AmbientLight (0x404040,100);
    scene.add(hlight);
    
    directionalLight = new THREE.DirectionalLight(0xffffff,100);
    directionalLight.position.set(1,1,1);
    directionalLight.castShadow = false;
    scene.add(directionalLight);
    
    light = new THREE.PointLight(0xc4c4c4,10);
    light.position.set(0,300,500);
    scene.add(light);
    
    light2 = new THREE.PointLight(0xc4c4c4,10);
    light2.position.set(500,100,0);
    scene.add(light2);
    
    light3 = new THREE.PointLight(0xc4c4c4,10);
    light3.position.set(0,100,-500);
    scene.add(light3);
    
    light4 = new THREE.PointLight(0xc4c4c4,10);
    light4.position.set(-500,300,500);
    scene.add(light4);

    // Create a mesh with the geometry and material
    var cuttingBoard = new THREE.Mesh(geometry, material);

    // Add the cutting board to the scene
    scene.add(cuttingBoard);

    cuttingBoard.rotation.x = 0.3;
    cuttingBoard.rotation.y = 0.7;

    var isDragging = false;
    var previousMousePosition = {
        x: 0,
        y: 0
    };
    
    // Add event listener for mouse down
    container.addEventListener('mousedown', function (event) {
        isDragging = true;
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });
    
    // Add event listener for mouse move
    container.addEventListener('mousemove', function (event) {
        if (isDragging) {
            var deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y
            };
    
            // Adjust rotation based on mouse movement
            cuttingBoard.rotation.x += deltaMove.y * 0.01;
            cuttingBoard.rotation.y += deltaMove.x * 0.01;
    
            previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
        }
    });
    
    // Add event listener for mouse up
    container.addEventListener('mouseup', function () {
        isDragging = false;
    });
    
    // Add event listener for mouse leave (to handle when the mouse leaves the container while dragging)
    container.addEventListener('mouseleave', function () {
        isDragging = false;
    });

    // Animation function
    var animate = function () {
        requestAnimationFrame(animate);
        // Render the scene
        renderer.render(scene, camera);
    };

    // Call the animate function
    animate();