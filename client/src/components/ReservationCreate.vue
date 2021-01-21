<template>
  <form v-on:submit.prevent="handleSubmit">
    <h2>Make Reservation</h2>
    <fieldset class="contact-info">
      <legend>Contact Information</legend>
      <div class="field-group">
        <label>Name</label>
        <input type="text" v-model="form.name" />
      </div>
      <div class="field-group">
        <label>Email</label>
        <input type="email" v-model="form.email" />
      </div>
    </fieldset>

    <fieldset class="scheduling-info">
      <legend>Scheduling Information</legend>
      <div class="field-group">
        <label>Party Size</label>
        <input type="number" v-model="form.party_size" />
      </div>
      <div class="field-group">
        <label>Reservation Date</label>
        <input type="date" v-model="reservation_date" />
      </div>
      <div class="field-group">
        <label>Reservation Time</label>
        <select v-model="reservation_time">
          <option
            v-for="time in availableTimes"
            :key="time.id"
            :value="formatHour(time.start_at, 'value')"
          >
            {{ formatHour(time.start_at, "display") }}
          </option>
        </select>
      </div>
    </fieldset>
    <button type="submit">Creates</button>
  </form>
</template>


<script lang="ts">
import { api } from "../api";
import { format } from "date-fns";
import { defineComponent } from "vue";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
const getTimeZoneValue = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export default defineComponent({
  emits: ["reservation_created"],
  data() {
    return {
      form: {
        name: "",
        email: "",
        party_size: "",
        scheduled_at: ""
      },
      reservation_date: "",
      reservation_time: "",

      availableTimes: []
    };
  },
  watch: {
    async reservation_date(newVal) {
      const { data } = await api.getAvailableTimes(newVal);

      let timeblocks = data.data;

      timeblocks = timeblocks.filter(
        (block: any) => block.reservation_count < block.capacity
      );

      this.form.scheduled_at = `${newVal} ${this.reservation_time}`;
      this.reservation_date = newVal;
      this.availableTimes = timeblocks;
    },
    reservation_time(newVal) {
      this.form.scheduled_at = `${this.reservation_date} ${newVal}`;
    }
  },
  methods: {
    async handleSubmit() {
      const utcDatetime = new Date(this.form.scheduled_at).toISOString();

      await api.createReservatgion({
        ...this.form,
        scheduled_at: utcDatetime
      });

      this.form = {
        name: "",
        email: "",
        party_size: "",
        scheduled_at: ""
      };

      this.$emit("reservation_created");
    },
    formatHour: function (value: Date | string, type: "value" | "display") {
      if (typeof value === "string") {
        value = new Date(value);
      }

      const formatStr = {
        value: "HH:mm:ss",
        display: "p"
      };

      const localTime = zonedTimeToUtc(value, getTimeZoneValue());

      return format(localTime, formatStr[type]);
    }
  }
});
</script>



<style lang="scss" scoped>
</style>