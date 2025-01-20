import * as THREE from 'three';

import Canvas from './Canvas';
import Environment from './Environment';
import EventAdapter from './EventAdapter';
import FileLoader from './FileLoader';
import TextureLoader from './TextureLoader';

class MiniThreeNext {
    /**
     * Initializes the environment and adapts the Three.js library for compatibility
     * with the wx mini game platform. It sets up the environment, replaces the
     * default file and texture loaders, and adapts the event handling and rendering
     * process to work with the wx canvas.
     */

    static init() {
        Environment.init();

        // 替换资源加载器
        (THREE as any).FileLoader = FileLoader as any;
        (THREE as any).TextureLoader = TextureLoader;

        // 添加事件适配
        const originalCreateRenderer = THREE.WebGLRenderer.prototype.constructor;
        (THREE as any).WebGLRenderer = function (this: THREE.WebGLRenderer, params: any) {
            const canvas = params?.canvas || new Canvas().getCanvas();
            EventAdapter.adaptCanvas(canvas);
            return originalCreateRenderer.call(this, { ...params, canvas });
        } as any;
    }
}

export default MiniThreeNext;

