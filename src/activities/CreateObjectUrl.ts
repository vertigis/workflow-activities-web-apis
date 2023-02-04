import type { IActivityHandler } from "@geocortex/workflow/runtime";

interface CreateObjectUrlInputs {
    /**
     * @description The content.
     * @required
     */
    content: Blob;
}

interface CreateObjectUrlOutputs {
    /**
     * @description The resulting Object URL.
     */
    url: string;

    /**
     * @description A function to revoke the Object URL.
     */
    revoke: () => void;
}

/**
 * @displayName Create Object URL
 * @defaultName objectUrl
 * @category Web APIs
 * @description Creates a URL representing the provided content.
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 * @helpUrl https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
 */
export default class CreateObjectUrlActivity implements IActivityHandler {
    execute(inputs: CreateObjectUrlInputs): CreateObjectUrlOutputs {
        const { content } = inputs;
        const url = URL.createObjectURL(content);
        return {
            url,
            revoke: () => URL.revokeObjectURL(url),
        };
    }
}
