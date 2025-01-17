// src/core/renderer.ts
import * as THREE from 'three';

export function createRenderer(params: Omit<THREE.WebGLRendererParameters, 'canvas' | 'context'> = {}): THREE.WebGLRenderer {
    // 使用小程序的 wx.createCanvas 创建 canvas
    const canvas = wx.createCanvas();
    const gl = canvas.getContext('webgl');

    // 创建一个 WebGLRenderer，绑定到小程序的 canvas 上
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        context: gl,
        ...params,
    });
    renderer.setSize(wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight);
    return renderer;
}
