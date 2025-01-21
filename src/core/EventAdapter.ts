export default class EventAdapter {
    static adaptCanvas(canvas: any, globalEnv: any): void {
      canvas.addEventListener = (type: string, listener: Function) => {
        if (type === 'touchstart') {
          globalEnv.onTouchStart((e: { touches: any; }) => listener(e.touches));
        } else if (type === 'touchmove') {
          globalEnv.onTouchMove((e: { touches: any; }) => listener(e.touches));
        } else if (type === 'touchend') {
          globalEnv.onTouchEnd((e: { changedTouches: any; }) => listener(e.changedTouches));
        }
      };
    }
  }
  