import * as THREE from 'three';

export default class FileLoader extends THREE.FileLoader {
  constructor(manager?: THREE.LoadingManager) {
    super(manager);
  }

  load(
    url: string,
    onLoad: (response: any) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): void {
    wx.request({
      url,
      responseType: 'arraybuffer',
      success: (res) => onLoad(res.data),
      fail: (err) => onError && onError(new ErrorEvent('error', { error: err })),
    });
  }
}