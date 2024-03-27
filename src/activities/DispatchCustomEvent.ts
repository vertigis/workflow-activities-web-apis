import type { IActivityHandler } from "@vertigis/workflow";

interface DispatchCustomEventInputs {
    /**
     * @description The type name of the event.
     * @required
     */
    type?: string;
    /**
     * @description The data of the event.
     */
    detail?: any;
    /**
     * @description A boolean value indicating whether the event bubbles. The default is false.
     */
    bubbles?: boolean;
    /**
     * @description A boolean value indicating whether the event can be cancelled. The default is false.
     */
    cancelable?: boolean;
}

interface DispatchCustomEventOutputs {
    /**
     * @description false if event is cancelable, and at least one of the event handlers which received event called Event.preventDefault(). Otherwise true.
     */
    result: boolean;
}

/**
 * @category Web APIs
 * @description Dispatches a custom event.
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 * @helpUrl https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
 */
export default class DispatchCustomEvent implements IActivityHandler {
    execute(inputs: DispatchCustomEventInputs): DispatchCustomEventOutputs {
        const { type, ...other } = inputs;
        if (!type) {
            throw new Error("type is required");
        }

        const event = new CustomEvent(type, {
            ...other,
        });
        const result = dispatchEvent(event);

        return {
            result,
        };
    }
}
