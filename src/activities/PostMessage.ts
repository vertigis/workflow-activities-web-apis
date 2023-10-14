import type { IActivityHandler } from "@geocortex/workflow/runtime";

interface PostMessageInputs {
    /**
     * @description The message to send.
     * @required
     */
    message: any;

    /**
     * @description The origin of the frame to send the message to.
     * @required
     */
    origin: "*" | string;

    /**
     * @description Whether to wait for a reply from the origin frame (via MessageChannel ports). The default is false.
     */
    awaitReply: boolean;
}

interface PostMessageOutputs {
    /**
     * @description The reply message from the origin frame. This is only available when Await Reply is true.
     */
    result?: unknown;
}

/**
 * @category Web APIs
 * @description Uses postMessage to send a message to the parent/opener frame.
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 * @helpUrl https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */
export default class PostMessage implements IActivityHandler {
    async execute(inputs: PostMessageInputs): Promise<PostMessageOutputs> {
        const { awaitReply, message, origin } = inputs;

        if (message === undefined || message === null) {
            throw new Error("message is required");
        }
        if (!origin) {
            throw new Error("origin is required");
        }

        const owner: Window | undefined = window.parent === window ? window.opener : window.parent;
        if (!owner) {
            throw new Error(
                "The Post Message activity requires a parent window or window opener."
            );
        } 
        
        if (awaitReply) {
            const result = await new Promise(resolve => {
                const channel = new MessageChannel();
                channel.port1.onmessage = ({ data }) => {
                    channel.port1.close();
                    resolve(data);
                };
                owner.postMessage(message, origin, [channel.port2]);
            });
            return {
                result,
            };
        } else {
            owner.postMessage(message, origin);
            return {};
        }

    }
}
