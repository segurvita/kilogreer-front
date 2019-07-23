<template>
  <div class="weightChart">
    <line-chart
      :chart-data="datacollection"
      :options="options"
      style="float: left"
      class="lineChart"
    ></line-chart>
  </div>
</template>

<script>
import dayjs from 'dayjs';
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
      return this.dailyList.map(item =>
        dayjs(item.createdDate).format('M/D'));
    },
    weights() {
      return this.dailyList.map(item =>
        Math.round(item.weightValue * 100) / 100);
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
                display: true,
                borderDash: [4, 4],
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

<style lang="css" scoped>
.weightChart {
  width: 100%;
  overflow-x: scroll;
}

.lineChart {
  margin-top: 20px;
  width: 2000px;
}
</style>
