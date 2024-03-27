import type { IActivityHandler } from "@vertigis/workflow";

interface DownloadFileInputs {
    /**
     * @description The file to download.
     * @required
     */
    file?: File | Blob;

    /**
     * @description The file name for the download. If not specified, the existing name of the file object is used.
     */
    fileName?: string;
}

interface DownloadFileOutputs {}

/**
 * @category Web APIs
 * @description Downloads a file to the end user's device.
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 */
export default class DownloadFile implements IActivityHandler {
    execute(inputs: DownloadFileInputs): DownloadFileOutputs {
        const { file, fileName } = inputs;
        if (!file) {
            throw new Error("file is required");
        }

        const blobUrl = URL.createObjectURL(file);
        try {
            const downloadLink: HTMLAnchorElement = document.createElement("a");
            downloadLink.href = blobUrl;
            downloadLink.download =
                fileName || (file instanceof File && file.name) || "download";

            const clickEvent = new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: false,
            });
            downloadLink.dispatchEvent(clickEvent);
        } finally {
            URL.revokeObjectURL(blobUrl);
        }

        return {};
    }
}
