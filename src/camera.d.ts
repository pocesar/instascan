export declare function cameraName(label: any): any;
export declare class MediaError extends Error {
    type: any;
    constructor(type: any);
}
export default class Camera {
    id: any;
    name: any;
    _stream: any;
    constructor(id: any, name: any);
    start(): Promise<any>;
    stop(): void;
    static getCameras(): Promise<any>;
    static _ensureAccess(): Promise<any>;
    static _wrapErrors(fn: any): Promise<any>;
}
