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
    ...mapGetters('weights', ['dailyList', 'loading']),
    times() {
      return this.dailyList.map(item => item.createdDate);
    },
    weights() {
      return this.dailyList.map(item => item.weightValue);
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
                beginAtZero: false,
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