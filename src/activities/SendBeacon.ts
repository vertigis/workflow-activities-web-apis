import type { IActivityHandler } from "@geocortex/workflow/runtime";

interface SendBeaconInputs {
    /**
     * @displayName URL
     * @description The URL that will receive the data. Can be relative or absolute.
     * @required
     */
    url?: string;
    /**
     * @description The data to send.
     */
    data?: string | Blob | ArrayBuffer;
}

interface SendBeaconOutputs {
    /**
     * @description true if the user agent successfully queued the data for transfer. Otherwise, false.
     */
    result: boolean;
}

/**
 * @category Web APIs
 * @description Asynchronously sends an HTTP POST request containing a small amount of data to a web server using navigator.sendBeacon().
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 * @helpUrl https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
 */
export default class SendBeacon implements IActivityHandler {
    execute(inputs: SendBeaconInputs): SendBeaconOutputs {
        const { data, url } = inputs;
        if (!url) {
            throw new Error("url is required");
        }

        const result = navigator.sendBeacon(url, data);
        
        return {
            result
        };
    }
}
