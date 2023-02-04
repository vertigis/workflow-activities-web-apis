import type { IActivityHandler } from "@geocortex/workflow/runtime";

interface GenerateRandomUuidOutputs {
    /**
     * @description The result of the activity.
     */
    result: string;
}

/**
 * @displayName Generate Random UUID
 * @defaultName uuid
 * @category Web APIs
 * @description Generates a v4 UUID using a cryptographically secure random number generator.
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 * @helpUrl https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
 */
export default class GenerateRandomUuid implements IActivityHandler {
    execute(): GenerateRandomUuidOutputs {
        return {
            result: crypto.randomUUID(),
        };
    }
}
