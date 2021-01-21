<template>
  <div class="container">
    <div class="scheduler">
      <div class="time-labels">
        <span v-for="label in timeLabels" :key="label">
          {{ formatDate(label, "time") }}</span
        >
      </div>
      <div class="time-blocks">
        <span
          v-for="block in timeBlocks"
          :key="block.time"
          :data-inuse="block.isUsed"
        >
        </span>
      </div>
    </div>

    <form v-on:submit.prevent="handleSubmit">
      <h2>Make Availability Block</h2>

      <div class="field-group">
        <label>Capacity</label>
        <input type="number" v-model="form.capacity" />
      </div>

      <div class="field-group">
        <label>Time Block</label>
        <select v-model="form.start_at">
          <template v-for="time in timeBlocks" :key="time.time">
            <option v-if="time.isUsed === false" :value="time.time">
              {{ formatHour(time.time, "display") }}
            </option>
          </template>
        </select>
      </div>
      <button>Create</button>
    </form>

    <AvailabilityBlockList class="blocks" :blocks="availableTimes" />
  </div>
</template>

<script lang="ts">
import { api } from "@/api";
import { addHours, addMinutes, format, formatISO9075 } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { defineComponent } from "vue";
import AvailabilityBlockList from "@/components/AvailabilityBlockList.vue";

const comparisonFormat = (str: string | Date) => {
  if (typeof str === "string") {
    str = new Date(str);
  }

  const x = formatISO9075(str, { representation: "time" });
  return new Date(`1/1/2000 ${x}`);
};

const getTimeZoneValue = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export default defineComponent({
  name: "Home",
  components: {
    AvailabilityBlockList
  },
  data() {
    return {
      availableTimes: [],
      form: {
        capacity: "",
        start_at: "",
        end_at: ""
      }
    };
  },
  async mounted() {
    await api.login();
    const { data } = await api.getTimeBlocks();

    this.availableTimes = data.data;
  },
  computed: {
    timeBlocks() {
      let time = new Date();
      time.setHours(0, 0, 0, 0);

      const blocks: any = [];

      for (let index = 0; index < 96; index++) {
        const partOfBlock = this.availableTimes.filter((b: any) => {
          const resTime = comparisonFormat(time);
          const start = comparisonFormat(b.start_at);
          const end = comparisonFormat(b.end_at);

          const isPartofBlock = start <= resTime && end > resTime;

          return isPartofBlock;
        });

        blocks.push({
          time,
          isUsed: partOfBlock.length > 0
        });

        time = addMinutes(time, 15);
      }

      return blocks;
    },
    timeLabels() {
      const time = new Date();
      time.setHours(0, 0, 0, 0);

      const blocks = [];

      for (let index = 0; index < 24; index++) {
        blocks.push(addHours(time, index));
      }

      return blocks;
    }
  },
  methods: {
    async handleSubmit() {
      const utcStart = new Date(this.form.start_at);

      const utcEnd = addMinutes(utcStart, 15);
      const form = {
        ...this.form,
        start_at: utcStart.toISOString(),
        end_at: utcEnd.toISOString()
      };

      await api.createTimeBlocks(form);

      const { data } = await api.getTimeBlocks();

      this.availableTimes = data.data;

      this.form = {
        capacity: "",
        start_at: "",
        end_at: ""
      };
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
    formatHour: function (value: Date | string, type: "value" | "display") {
      if (typeof value === "string") {
        value = new Date(value);
      }

      const formatStr = {
        value: "HH:mm:ss",
        display: "p"
      };

      const localtTime = utcToZonedTime(value, getTimeZoneValue());

      return format(localtTime, formatStr[type]);
    }
  }
});
</script>



<style lang="scss" scoped>
.picker {
  > .box {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-color: red;
  }
}
.time-labels {
  font-size: 13px;
  width: 100%;

  display: grid;
  grid-template-rows: 2rem;
  grid-template-columns: repeat(24, 1fr);

  > span {
    display: flex;
    align-items: flex-end;
  }
}
.time-blocks {
  font-size: 12px;
  width: 100%;

  display: grid;
  grid-template-rows: 2rem;
  grid-template-columns: repeat(96, 1fr);
  border-top: 2px solid black;
  border-bottom: 2px solid black;

  [data-inuse="true"] {
    background-color: #000;
  }

  > span {
    display: flex;

    border: 1px solid #dedede;

    &:first-child {
      border-left: 2px solid black;
    }

    &:nth-child(4n) {
      border-right: 2px solid black;
    }
  }
}

.blocks {
  @media (min-width: 1000px) {
    width: 25%;
  }
}
</style>
