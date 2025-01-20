import { TextureLoader as THREETextureLoader, Texture as THREETexture } from 'three';

export default class TextureLoader extends THREETextureLoader {
  load(
    url: string,
    onLoad: (texture: THREETexture) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): THREETexture {
    const texture = new THREETexture();
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
