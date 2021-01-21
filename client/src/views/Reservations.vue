<template>
  <div class="container layout">
    <ReservationCreate
      class="form-container"
      v-on:reservation_created="loadReservations"
    />
    <ReservationList class="reservation" :reservations="reservations" />
  </div>
</template>

<script lang="ts">
import { api } from "@/api";
import { defineComponent } from "vue";
import ReservationList from "../components/ReversavtionList.vue";
import ReservationCreate from "../components/ReservationCreate.vue";
export default defineComponent({
  data() {
    return {
      reservations: []
    };
  },
  components: {
    ReservationList,
    ReservationCreate
  },
  async mounted() {
    await api.login();
    this.loadReservations();
  },
  methods: {
    async loadReservations() {
      const { data } = await api.getReservations();

      this.reservations = data.data;
    }
  }
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
}

.reservation {
  @media (min-width: 1000px) {
    width: 25%;
  }
}
</style>