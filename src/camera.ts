export function cameraName(label: any) {
  let clean = label.replace(/\s*\([0-9a-f]+(:[0-9a-f]+)?\)\s*$/, '');
  return clean || label || null;
}

export class MediaError extends Error {
  type: any;

  constructor(type: any) {
    super(`Cannot access video stream (${type}).`);
    this.type = type;
  }
}

export default class Camera {
  id: any;
  name: any;
  _stream: any;

  constructor(id: any, name: any) {
    this.id = id;
    this.name = name;
    this._stream = null;
  }

  async start() {
    let constraints: any = {
      audio: false,
      video: {
        mandatory: {
          sourceId: this.id,
          minWidth: 600,
          maxWidth: 800,
          minAspectRatio: 1.6
        },
        optional: []
      }
    };

    this._stream = await Camera._wrapErrors(async () => {
      return await navigator.mediaDevices.getUserMedia(constraints);
    });

    return this._stream;
  }

  stop() {
    if (!this._stream) {
      return;
    }

    for (let stream of this._stream.getVideoTracks()) {
      stream.stop();
    }

    this._stream = null;
  }

  static async getCameras() {
    await this._ensureAccess();

    let devices: any = await navigator.mediaDevices.enumerateDevices();
    return devices
      .filter((d: any) => d.kind === 'videoinput')
      .map((d: any) => new Camera(d.deviceId, cameraName(d.label)));
  }

  static async _ensureAccess() {
    return await this._wrapErrors(async () => {
      let access: any = await navigator.mediaDevices.getUserMedia({ video: true });
      let stream: any
      for (stream of access.getVideoTracks()) {
        stream.stop();
      }
    })
  }

  static async _wrapErrors(fn: any) {
    try {
      return await fn();
    } catch (e) {
      if (e.name) {
        throw new MediaError(e.name);
      } else {
        throw e;
      }
    }
  }
}
