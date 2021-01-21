import { formatISO9075 } from "date-fns";
import { format } from "date-fns";
import { defineComponent } from "vue";


export default defineComponent({

    methods: {
        formatHour: function (value: Date | string, type: "value" | "display") {
            if (typeof value === "string") {
                value = new Date(value);
            }

            const formatStr = {
                value: "HH:mm:ss",
                display: "p"
            };
            return format(value, formatStr[type]);
        },
        formatDate: function (value: Date | string, type: "date" | "time") {
            if (typeof value === "string") {
                value = new Date(value);
            }

            const formatStr = {
                date: "yyyy/MM/dd",
                time: "p"
            };

            return format(value, formatStr[type]);
        },
        comparisonFormat(str: string | Date) {
            if (typeof str === "string") {
                str = new Date(str);
            }

            const x = formatISO9075(str, { representation: "time" });
            return new Date(`1/1/2000 ${x}`);
        }

    }
})