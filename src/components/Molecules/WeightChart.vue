<template>
  <line-chart :chart-data="datacollection" :options="options"></line-chart>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LineChart from '@/components/Atoms/LineChart';

export default {
  name: 'WeightChart',
  components: {
    LineChart,
  },
  computed: {
    ...mapGetters('weights', ['list', 'loading']),
    times() {
      return this.list.map(item => item.date);
    },
    weights() {
      return this.list.map(item => item.value);
    },
    datacollection() {
      return {
        labels: this.times,
        datasets: [
          {
            label: 'Weight',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: this.weights,
          },
        ],
      };
    },
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapActions('weights', ['getList']),
  },
};
</script>