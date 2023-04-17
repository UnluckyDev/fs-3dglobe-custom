/**
 * This is a custom implementation of Finsweet 3D Globe script.
 *
 */

function FsGlobe() {
	const mainContainer = document.querySelector(
		"[fs-3dglobe-element='container']"
	)

	const bgTexture = mainContainer.getAttribute('fs-3dglobe-img')

	const defaultValue = {
		url: bgTexture || 'https://cdn.finsweet.com/files/globe/earthmap1k.jpg'
	}

	const globeContainer = document.createElement('div')
	globeContainer.className = 'fs-3dglobe-container'

	mainContainer.appendChild(globeContainer)

	const canvas = document.createElement('canvas')

	canvas.className = 'canvas-3dglobe-container'
	globeContainer.appendChild(canvas)

	/**
	 * Sizes
	 */
	const sizes = {
		width: mainContainer.clientWidth,
		height: mainContainer.clientHeight
	}

	/**
	 * Renderer
	 */
	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })

	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

	/**
	 * Camera Settings
	 */
	const fov = 60
	const aspect = sizes.width / sizes.height // the canvas default
	const near = 0.1
	const far = 10
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
	camera.position.z = 2.5
	camera.position.x = -1.5
	camera.position.y = -0.3

	// const controls = new THREE.OrbitControls(camera, canvas)
	// controls.enableDamping = true
	// controls.enablePan = false
	// controls.minDistance = 1.2
	// controls.maxDistance = 4
	// controls.autoRotate = false
	// controls.autoRotateSpeed = 0.2
	// // //  controls.enableDamping = true;
	// //   controls.campingFactor = 0.25;
	// controls.enableZoom = false
	// controls.update()

	const scene = new THREE.Scene()
	renderer.setClearColor(0x000000, 0)

	const loader = new THREE.TextureLoader()
	const texture = loader.load(defaultValue.url)
	texture.needsUpdate = true

	const geometry = new THREE.SphereBufferGeometry(1, 64, 32)
	const material = new THREE.MeshBasicMaterial({
		map: texture,
		side: THREE.DoubleSide
	})
	const mesh = new THREE.Mesh(geometry, material)
	mesh.scale.set(0.9, 0.9, 0.9)
	mesh.rotation.x = Math.PI / 4
	scene.add(mesh)

	material.map.needsUpdate = true

	window.addEventListener('resize', () => {
		// Update sizes
		sizes.width = mainContainer.clientWidth
		sizes.height = mainContainer.clientHeight

		// Update camera
		camera.aspect = sizes.width / sizes.height
		camera.updateProjectionMatrix()

		// Update renderer
		renderer.setSize(sizes.width, sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	})

	/**
	 * Animate
	 */
	const clock = new THREE.Clock()

	const tick = () => {
		const elapsedTime = clock.getElapsedTime()

		// UPDATE SPHERE
		mesh.rotation.y = elapsedTime * 0.1

		// Update controls
		// controls.update()

		// Render
		renderer.render(scene, camera)

		// Call tick again on the next frame
		window.requestAnimationFrame(tick)
	}

	tick()
}

;(function () {
	FsGlobe()
})()
