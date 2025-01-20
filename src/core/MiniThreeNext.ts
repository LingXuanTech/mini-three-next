import { WebGLRenderer, FileLoader as ThreeFileLoader, TextureLoader as ThreeTextureLoader } from 'three';

import Canvas from './Canvas';
import Environment from './Environment';
import EventAdapter from './EventAdapter';
import FileLoader from './FileLoader';
import TextureLoader from './TextureLoader';

interface MiniThreeNextOptions { 
    useCustomLoader?: boolean
}

class MiniThreeNext {
    /**
     * Initializes the environment and adapts the Three.js library for compatibility
     * with the wx mini game platform. It sets up the environment, replaces the
     * default file and texture loaders, and adapts the event handling and rendering
     * process to work with the wx canvas.
     */
    static init(options: MiniThreeNextOptions = {useCustomLoader: true}): void {
        Environment.init();

        // 替换资源加载器
        if (options.useCustomLoader) {
            Object.assign(ThreeFileLoader.prototype, FileLoader.prototype);
            Object.assign(ThreeTextureLoader.prototype, TextureLoader.prototype);
        }

        // 添加事件适配
        const originalCreateRenderer = WebGLRenderer.prototype.constructor;
        WebGLRenderer.prototype.constructor = function (params: any) {
            const canvas = params?.canvas || new Canvas().getCanvas();
            EventAdapter.adaptCanvas(canvas);
            return originalCreateRenderer.call(this, { ...params, canvas });
        };
    }
}

export default MiniThreeNext;
