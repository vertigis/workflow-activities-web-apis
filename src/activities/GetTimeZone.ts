import type { IActivityHandler } from "@geocortex/workflow/runtime";

interface GetTimeZoneOutputs {
    /**
     * @description The time zone of the end user.
     */
    result: string;
}

/**
 * @displayName Get Time Zone
 * @defaultName timeZone
 * @category Web APIs
 * @description Gets the time zone of the end user as reported by the web browser.
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 * @helpUrl https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezone
 */
export default class GetTimeZone implements IActivityHandler {
    execute(): GetTimeZoneOutputs {
        return {
            result: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
    }
}
