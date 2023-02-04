import type { IActivityHandler } from "@geocortex/workflow/runtime";

interface HashMessageInputs {
    /**
     * @description The message to hash.
     * @required
     */
    message?: string | ArrayBuffer;

    /**
     * @description The hash algorithm to use. The default is SHA-256.
     */
    algorithm?: "SHA-256" | "SHA-384" | "SHA-512" | string;
}

interface HashMessageOutputs {
    /**
     * @description The hash digest represented as a hex string.
     */
    result: string;
}

/**
 * @category Web APIs
 * @defaultName hash
 * @description Generates a hash digest of the supplied message.
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 * @helpUrl https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 */
export default class HashMessage implements IActivityHandler {
    async execute(inputs: HashMessageInputs): Promise<HashMessageOutputs> {
        const { algorithm = "SHA-256", message = "" } = inputs;
        const result = await digestMessage(algorithm, message);
        return {
            result,
        };
    }
}

async function digestMessage(algorithm: string, message: string | BufferSource) {
    const data = typeof message === "string" ? new TextEncoder().encode(message) : message;
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join('');
    return hashHex;
}