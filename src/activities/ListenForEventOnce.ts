import type { IActivityHandler } from "@vertigis/workflow";

interface ListenForEventOnceInputs {
    /**
     * @description The type of the event to listen for.
     * @required
     */
    type?: string;

    /**
     * @description The number of milliseconds to wait for the event. If the timeout is reached the activity will throw an error.
     */
    timeout?: number;
}

interface ListenForEventOnceOutputs {
    /**
     * @description The captured event.
     */
    result: Event;
}

/**
 * @category Web APIs
 * @defaultName event
 * @description Adds an event listener for the specified event type.
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 */
export default class ListenForEventOnce implements IActivityHandler {
    async execute(
        inputs: ListenForEventOnceInputs,
    ): Promise<ListenForEventOnceOutputs> {
        const { timeout = 0, type } = inputs;
        if (!type) {
            throw new Error("type is required");
        }

        const promise = new Promise<Event>((resolve, reject) => {
            const signal = AbortSignal.timeout(
                timeout > 0 ? timeout : Number.MAX_SAFE_INTEGER,
            );
            signal.onabort = () => {
                reject(
                    new Error(
                        `Activity timed out waiting for '${type}' event.`,
                    ),
                );
            };

            addEventListener(
                type,
                (e: Event) => {
                    signal.onabort = null;
                    resolve(e);
                },
                {
                    once: true,
                    signal,
                },
            );
        });
        return {
            result: await promise,
        };
    }
}
