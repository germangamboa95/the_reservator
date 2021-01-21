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
    <AvailabilityCreate :timeBlocks="timeBlocks" />
    <AvailabilityBlockList class="blocks" :blocks="availableTimes" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { api } from "@/api";
import { addHours, addMinutes } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import AvailabilityBlockList from "@/components/AvailabilityBlockList.vue";
import AvailabilityCreate from "@/components/AvailabilityCreate.vue";
import DateMixin from "@/mixins/DateMixin";

export default defineComponent({
  components: {
    AvailabilityBlockList,
    AvailabilityCreate
  },
  mixins: [DateMixin],
  data() {
    return {
      availableTimes: []
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
          const resTime = this.comparisonFormat(time);
          const start = this.comparisonFormat(b.start_at);
          const end = this.comparisonFormat(b.end_at);

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
