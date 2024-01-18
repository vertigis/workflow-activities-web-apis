import type { IActivityHandler } from "@vertigis/workflow";

interface OpenWindowInputs {
    /* eslint-disable @typescript-eslint/no-redundant-type-constituents */

    /**
     * @displayName URL
     * @description The URL or path of the resource to be loaded.
     * @required
     */
    url?: string;
    /**
     * @description The name of the browsing context the resource is being loaded into. If the name doesn't identify an existing context, a new context is created and given the specified name.
     */
    target?: "_self" | "_blank" | "_parent" | "_top" | string;
    /**
     * @description A comma-separated list of window features in the form name=value.
     */
    windowFeatures?: string;

    /* eslint-enable @typescript-eslint/no-redundant-type-constituents */
}

interface OpenWindowOutputs {}

/**
 * @category Web APIs
 * @description Opens a URL in new window using window.open().
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 * @helpUrl https://developer.mozilla.org/en-US/docs/Web/API/Window/open
 */
export default class OpenWindow implements IActivityHandler {
    execute(inputs: OpenWindowInputs): OpenWindowOutputs {
        const { target, url, windowFeatures } = inputs;
        if (!url) {
            throw new Error("url is required");
        }

        const win = window.open(url, target, windowFeatures);
        if (win) {
            win.opener = undefined;
        }

        return {};
    }
}
