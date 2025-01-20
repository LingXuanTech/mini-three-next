export default class Environment {
    static eventListeners: { [key: string]: Function[] } = {};

    static init() {
        // 模拟 document 对象
        (global as any).document = {
            createElement(tag: string) {
                if (tag === 'canvas') {
                    // 返回微信小程序的 OffscreenCanvas
                    return wx.createOffscreenCanvas();
                } else if (tag === 'img') {
                    // 返回图片对象（部分加载器需要）
                    return new Image();
                }
                throw new Error(`Unsupported element creation: ${tag}`);
            },
        };

        // 模拟 window 对象
        (global as any).window = {
            innerWidth: wx.getSystemInfoSync().screenWidth,
            innerHeight: wx.getSystemInfoSync().screenHeight,
            devicePixelRatio: wx.getSystemInfoSync().pixelRatio,

            addEventListener(type: string, listener: Function) {
                if (!Environment.eventListeners[type]) {
                    Environment.eventListeners[type] = [];
                }
                Environment.eventListeners[type].push(listener);
                if (type === 'resize') {
                    console.warn('Resize events are not natively supported in WeChat Mini Programs.');
                }
            },

            removeEventListener(type: string, listener: Function) {
                if (!Environment.eventListeners[type]) return;
                Environment.eventListeners[type] = Environment.eventListeners[type].filter(
                    (l) => l !== listener
                );
            },
        };

        // 为兼容加载器，添加部分必要的全局方法
        (global as any).atob = (input: string) => Buffer.from(input, 'base64').toString('binary');
        (global as any).btoa = (input: string) => Buffer.from(input, 'binary').toString('base64');
    }
}

