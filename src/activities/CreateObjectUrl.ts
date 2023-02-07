import type { IActivityHandler } from "@geocortex/workflow/runtime";

const defaultAllowedMimeTypes = new Set([
    "application/json",
    "application/octet-stream",
    "application/pdf",
    "application/rtf",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/zip",
    "audio/mpeg",
    "audio/wav",
    "audio/webm",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/tiff",
    "image/webp",
    "text/csv",
    "text/plain",
    "video/mp4",
    "video/mpeg",
    "video/webm",
]);

interface CreateObjectUrlInputs {
    /**
     * @description The content.
     * @required
     */
    content: File | Blob;

    /**
     * @displayName Allowed MIME Types
     * @description A list of MIME types to allow. If not specified a list of common and safe MIME types is used.
     * WARNING: including MIME types like "text/html" or "image/svg+xml" that can execute JavaScript increases the risk of XSS attacks.
     * Don't use this property if you don't understand the risks.
     */
    allowedMimeTypes?: string[];
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
        const { allowedMimeTypes, content } = inputs;

        let allow = false;
        const mimeType = content.type.toLowerCase();
        if (allowedMimeTypes) {
            allow = allowedMimeTypes.includes(mimeType);
        } else {
            allow = defaultAllowedMimeTypes.has(mimeType);
        }

        if (!allow) {
            throw new Error(`MIME type '${content.type}' is not allowed`);
        }

        const url = URL.createObjectURL(content);
        return {
            url,
            revoke: () => URL.revokeObjectURL(url),
        };
    }
}
