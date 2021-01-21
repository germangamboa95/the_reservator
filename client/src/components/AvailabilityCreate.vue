<template>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { addHours, addMinutes } from "date-fns";
import DateMixin from "@/mixins/DateMixin";
import { api } from "@/api";

export default defineComponent({
  props: {
    timeBlocks: {
      type: Array,
      required: true
    }
  },
  mixins: [DateMixin],
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
    }
  }
});
</script>

<style>
</style>