import type { IActivityHandler } from "@geocortex/workflow/runtime";

interface GetDateTimeFormatOptionsOutputs {
    /**
     * @description The date and time formatting options.
     */
    result: {
        calendar: string;
        numberingSystem: string;
        locale: string;
        timeZone: string;
    };
}

/**
 * @displayName Get Date Time Format Options
 * @defaultName dateTimeFormatOptions
 * @category Web APIs
 * @description Gets the date and time formatting options as reported by the web browser.
 * @clientOnly
 * @supportedApps EXB, GWV, WAB, GVH
 * @helpUrl https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions
 */
export default class GetDateTimeFormatOptions implements IActivityHandler {
    execute(): GetDateTimeFormatOptionsOutputs {
        return {
            result: Intl.DateTimeFormat().resolvedOptions(),
        };
    }
}
