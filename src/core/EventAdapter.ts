export default class EventAdapter {
    static adaptCanvas(canvas: any) {
      canvas.addEventListener = (type: string, listener: Function) => {
        if (type === 'touchstart') {
          wx.onTouchStart((e: { touches: any; }) => listener(e.touches));
        } else if (type === 'touchmove') {
          wx.onTouchMove((e: { touches: any; }) => listener(e.touches));
        } else if (type === 'touchend') {
          wx.onTouchEnd((e: { changedTouches: any; }) => listener(e.changedTouches));
        }
      };
    }
  }
  