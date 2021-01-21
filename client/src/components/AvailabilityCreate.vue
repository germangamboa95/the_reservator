<template>
  <form v-on:submit.prevent="handleSubmit">
    <h2>Make Availability Block</h2>
    <fieldset class="availability-info">
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
    </fieldset>
    <div class="btn-container">
      <button class="submit-btn" type="submit">Create</button>
    </div>
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
    },
    availableTimes: {
      type: Array,
      required: true
    }
  },
  mixins: [DateMixin],
  data() {
    return {
      form: {
        capacity: "",
        start_at: "",
        end_at: ""
      }
    };
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

      this.$emit("time_block_created");

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