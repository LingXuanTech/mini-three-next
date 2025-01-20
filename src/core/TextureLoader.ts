import * as THREE from 'three';

export default class TextureLoader extends THREE.TextureLoader {
  load(
    url: string,
    onLoad: (texture: THREE.Texture) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): THREE.Texture {
    const texture = new THREE.Texture();
    wx.request({
      url,
      responseType: 'arraybuffer',
      success: (res: { data: BlobPart; }) => {
        const blob = new Blob([res.data]);
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
          texture.image = img;
          texture.needsUpdate = true;
          onLoad(texture);
        };
      },
      fail: (err: any) => onError && onError(new ErrorEvent('error', { error: err })),
      onProgress: (event: any) => onProgress?.(event)
    });
    return texture;
  }
}
