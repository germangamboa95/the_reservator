<template>
  <div>
    <ul class="content-list">
      <template v-for="block in blocks" :key="block.id">
        <li class="list-item">
          <div class="block-detail">
            <div class="time">{{ formatDate(block.start_at, "time") }}</div>
            <div class="datum">Capacity: {{ block.capacity }}</div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { format } from "date-fns";
import DateMixin from "@/mixins/DateMixin";

export default defineComponent({
  props: {
    blocks: {
      type: Array,
      required: true
    }
  },
  mixins: [DateMixin]
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

.block-detail {
  text-align: left;
  padding: 1rem;
  > .time {
    font-size: 1.25rem;
  }

  > .datum {
    margin: 0.25rem 0;
  }
}
</style>