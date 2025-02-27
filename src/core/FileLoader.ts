import {FileLoader as THREEFileLoader, LoadingManager as THREELoadingManager} from 'three';

export default class FileLoader extends THREEFileLoader {
  constructor(manager?: THREELoadingManager) {
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
      success: (res: { data: any; }) => onLoad(res.data),
      fail: (err: any) => onError && onError(new ErrorEvent('error', { error: err })),
      onProgress: (event: any) => onProgress?.(event)
    });
  }
}