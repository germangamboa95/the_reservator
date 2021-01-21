<template>
  <div>
    <ul class="content-list">
      <template v-for="reservation in reservations" :key="reservation.id">
        <li class="list-item">
          <div class="reservation-detail">
            <h2 class="datum">{{ reservation.name }}</h2>
            <div class="datum">{{ reservation.email }}</div>
            <div class="datum">Party Size: {{ reservation.party_size }}</div>
            <div class="datum">
              <div>{{ formatDate(reservation.scheduled_at, "date") }}</div>
              <div>{{ formatDate(reservation.scheduled_at, "time") }}</div>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { format } from "date-fns";
export default defineComponent({
  props: {
    reservations: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate: function (value: Date | string, type: "date" | "time") {
      if (typeof value === "string") {
        value = new Date(value);
      }

      const formatStr = {
        date: "yyyy/MM/dd",
        time: "p"
      };

      return format(value, formatStr[type]);
    }
  }
});
</script>

<style lang="scss" scoped>
.content-list {
  padding: 0;
  list-style: none;
  width: 100%;
  > .list-item {
    border: 1px solid #dedede;
    margin: 1rem 0;
  }
}

.reservation-detail {
  text-align: left;
  padding: 1rem;
  > .name {
    font-size: 1.25rem;
  }

  > .datum {
    margin: 0.25rem 0;
  }
}
</style>