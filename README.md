# mini-three-next

mini-three-next 是一个用于在微信小程序中适配 Three.js 的工具包，旨在提供与 Web 环境一致的使用体验。通过解决小程序与浏览器环境的差异，开发者可以在小程序中更加便捷地使用 Three.js。

## 功能特性

- **环境模拟**：
  - 模拟浏览器的 `document` 和 `window` 对象。
  - 提供 `addEventListener` 和 `removeEventListener` 的基本支持。
- **资源加载**：
  - 重写了 `THREE.FileLoader` 和 `THREE.TextureLoader`，支持小程序的资源加载逻辑。
- **事件适配**：
  - 适配触摸事件（`touchstart`、`touchmove`、`touchend`）。
- **生命周期管理**：
  - 提供与小程序页面生命周期绑定的工具，支持暂停和释放资源。
- **纹理优化**：
  - 支持压缩纹理（如 KTX2）的加载。

## 安装

```bash
npm install mini-three-next
```

## 快速开始

### 初始化适配器

在使用 Three.js 之前，需要初始化 mini-three-next

```typescript
import MiniThreeNext from 'mini-three-next';

MiniThreeNext.init();
```

### 示例代码

以下是一个简单的场景示例：

```typescript
import * as THREE from 'three';
import MiniThreeNext from 'mini-three-next';

// 初始化适配器
MiniThreeNext.init();

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// 设置渲染器尺寸
renderer.setSize(window.innerWidth, window.innerHeight);

// 添加一个立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// 动画循环
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
```

## 主要模块说明

### 1. Environment

- 模拟 `document` 和 `window` 对象。
- 支持事件监听（如 `addEventListener`）。

### 2. Canvas

- 提供对微信小程序 `OffscreenCanvas` 的封装。

### 3. FileLoader

- 重写 `THREE.FileLoader`，使用微信小程序的 `wx.request` 加载资源。

### 4. TextureLoader

- 重写 `THREE.TextureLoader`，支持纹理加载和更新。

### 5. EventAdapter

- 适配小程序触摸事件，使其兼容 Three.js 的事件监听接口。

### 6. ThreeLifecycle

- 管理小程序页面的生命周期（`onHide` 和 `onUnload`），自动暂停和释放资源。

### 7. TextureOptimizer

- 使用 KTX2Loader 支持压缩纹理加载，优化内存使用。

## 注意事项

1. **资源路径**：
   - 确保加载的资源路径可通过小程序的 `wx.request` 访问。
2. **触摸事件**：
   - 小程序中没有鼠标事件，需使用触摸事件代替。
3. **生命周期管理**：
   - 在页面卸载时自动释放资源，但仍需注意显式管理复杂场景的内存。

## 贡献

如果您发现问题或有改进建议，欢迎提交 [Issues](https://github.com/your-repo/wx-three-adapter/issues) 或 Pull Requests。

## License

MIT License

