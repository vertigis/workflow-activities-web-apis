import type { IActivityHandler } from "@geocortex/workflow/runtime";
import { IActivityContext } from "@geocortex/workflow/runtime/IActivityHandler";

interface ListenForEventOnceInputs {
    /**
     * @description The type of the event to listen for.
     * @required
     */
    type?: string;

    /**
     * @description The number of milliseconds to wait for the event.
     */
    timeout?: number;
}

interface ListenForEventOnceOutputs {
    /**
     * @description The result of the activity.
     */
    result: Event;
}

/**
 * @category Web APIs
 * @defaultName event
 * @description 
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 */
export default class ListenForEventOnce implements IActivityHandler {
    async execute(inputs: ListenForEventOnceInputs, context: IActivityContext): Promise<ListenForEventOnceOutputs> {
        const { timeout = 0, type } = inputs;
        if (!type) {
            throw new Error("type is required");
        }

        const promise = new Promise<Event>((resolve, reject) => {
            let timer: string | number | NodeJS.Timeout | undefined;
            const listener = (e: Event) => {
                clearTimeout(timer);
                resolve(e);
            };
            window.addEventListener(type, listener, {
                once: true,
            });
            if (timeout > 0) {
                timer = setTimeout(() => {
                    window.removeEventListener(type, listener);
                    reject(new Error(`Activity timed out waiting for '${type}' event.`));
                }, timeout);
            }
        });
        return {
            result: await promise,
        }
    }
}
