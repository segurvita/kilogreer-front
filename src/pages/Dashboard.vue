<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div
        class="collapse navbar-collapse"
        id="navbarNavAltMarkup"
      >
        <div class="navbar-nav">
          <a
            class="nav-item nav-link active"
            href="#"
          >
            <router-link to="/">Dashboard</router-link>
          </a>
        </div>
      </div>
    </nav>
    <section class="container-fluid">
      <h1>Weight</h1>
      <weight-chart></weight-chart>
    </section>
  </div>
</template>

<script>
import WeightChart from '@/components/Molecules/WeightChart';

export default {
  name: 'Dashboard',
  components: {
    WeightChart,
  },
};
</script>

<style scoped>
h1 {
  margin-top: 20px;
}
</style>