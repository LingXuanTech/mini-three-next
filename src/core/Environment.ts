export default class Environment {
    static eventListeners: { [key: string]: Function[] } = {};

    static init(globalEnv?: any) {
        // 模拟 document 对象   
        if (!global.document) {
            Object.defineProperty(global, 'document', {
                value: {
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
                },
                writable: false,
                configurable: true,
            });
        } else {
            (global.document as any).createElement = (tag: string) => {
                if (tag === 'canvas') {
                    // 返回微信小程序的 OffscreenCanvas
                    return wx.createOffscreenCanvas();
                } else if (tag === 'img') {
                    // 返回图片对象（部分加载器需要）
                    return new Image();
                }
                throw new Error(`Unsupported element creation: ${tag}`);
            }
        }

        // 模拟 window 对象
        if (!global.window) {
            Object.defineProperty(global, 'window', {
                value: {
                    innerWidth: globalEnv.getSystemInfoSync().screenWidth,
                    innerHeight: globalEnv.getSystemInfoSync().screenHeight,
                    devicePixelRatio: globalEnv.getSystemInfoSync().pixelRatio,

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
                },
                writable: false,
                configurable: true,
            });

            // 为兼容加载器，添加部分必要的全局方法
            Object.defineProperty(global, 'atob', {
                value: (input: string) => Buffer.from(input, 'base64').toString('binary'),
                writable: false,
                configurable: true,
            });

            Object.defineProperty(global, 'btoa', {
                value: (input: string) => Buffer.from(input, 'binary').toString('base64'),
                writable: false,
                configurable: true,
            });
        } else {
            global.window.innerWidth = globalEnv.getSystemInfoSync().screenWidth;
            global.window.innerHeight = globalEnv.getSystemInfoSync().screenHeight;
            global.window.devicePixelRatio = globalEnv.getSystemInfoSync().pixelRatio;

            (global.window as any).addEventListener = (type: string, listener: Function) => {
                if (!Environment.eventListeners[type]) {
                    Environment.eventListeners[type] = [];
                }
                Environment.eventListeners[type].push(listener);
                if (type === 'resize') {
                    console.warn('Resize events are not natively supported in WeChat Mini Programs.');
                }
            };

            (global.window as any).removeEventListener = (type: string, listener: Function) => {
                if (!Environment.eventListeners[type]) return;
                Environment.eventListeners[type] = Environment.eventListeners[type].filter(
                    (l) => l !== listener
                );
            };
        }

    }
}