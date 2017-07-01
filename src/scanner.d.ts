/// <reference types="node" />
import * as EventEmitter from 'events';
export declare class ScanProvider {
    scanPeriod: any;
    captureImage: any;
    refractoryPeriod: any;
    _emitter: any;
    _frameCount: any;
    _analyzer: any;
    _lastResult: any;
    _active: any;
    refractoryTimeout: any;
    constructor(emitter: any, analyzer: any, captureImage: any, scanPeriod: any, refractoryPeriod: any);
    start(): void;
    stop(): void;
    scan(): any;
    _analyze(skipDups: any): any;
    _scan(): void;
}
export declare class Analyzer {
    video: any;
    imageBuffer: any;
    sensorLeft: any;
    sensorTop: any;
    sensorWidth: any;
    sensorHeight: any;
    canvas: any;
    canvasContext: any;
    decodeCallback: any;
    constructor(video: any);
    analyze(): {
        result: any;
        canvas: any;
    };
}
export default class Scanner extends EventEmitter {
    video: any;
    backgroundScan: any;
    _mirror: any;
    _continuous: any;
    _analyzer: any;
    _camera: any;
    _scanner: any;
    _fsm: any;
    constructor(opts: any);
    scan(): any;
    start(camera?: any): Promise<void>;
    stop(): Promise<void>;
    captureImage: any;
    scanPeriod: any;
    refractoryPeriod: any;
    continuous: any;
    mirror: any;
    _enableScan(camera: any): Promise<void>;
    _disableScan(): void;
    _configureVideo(opts: any): any;
    _createStateMachine(): any;
}
