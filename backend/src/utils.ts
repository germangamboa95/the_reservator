import { formatISO9075 } from "date-fns"
import { ValueTransformer } from "typeorm"

export const dateTransformer: ValueTransformer = {
    from(val) {
        return val // Return utc, client converts to own tz
    },
    to(val) {

        if (typeof val === 'string') {
            val = new Date(val)
        }

        return formatISO9075(val)
    }
}


export const comparisonFormat = (str: string | Date) => {


    if (typeof str === 'string') {
        str = new Date(str)
    }

    const x = formatISO9075(str, { representation: "time" })
    return new Date(`1/1/2000 ${x}`)

}