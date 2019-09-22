<template>
  <div class="weightChart">
    <line-chart
      :chart-data="datacollection"
      :options="options"
      :style="styles"
      class="lineChart"
    ></line-chart>
  </div>
</template>

<script>
import moment from 'moment-timezone';
import { mapGetters, mapActions } from 'vuex';
import LineChart from '@/components/Atoms/LineChart';

moment.locale('ja');

export default {
  name: 'WeightChart',
  components: {
    LineChart,
  },
  computed: {
    ...mapGetters('weights', ['dailyList', 'loading']),
    dailyListVue() {
      return this.dailyList.slice(-365 * 0.5);
    },
    weights() {
      return this.dailyListVue.map(item => ({
        x: moment(item.createdDate),
        y: Math.round(item.weightValue * 100) / 100,
      }));
    },
    datacollection() {
      return {
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
    width() {
      if (this.dailyListVue && this.dailyListVue.length > 0) {
        if (this.dailyListVue[0].createdDate
          && this.dailyListVue.slice(-1)[0].createdDate) {
          const firstMoment = this.dailyListVue[0].createdMoment;
          const lastMoment = this.dailyListVue.slice(-1)[0].createdMoment;
          const width = lastMoment.diff(firstMoment, 'days', true) * 40;
          return width;
        }
      }
      return 900;
    },
    height() {
      if (this.dailyListVue && this.dailyListVue.length > 0) {
        if (this.dailyListVue[0].weightValue
          && this.dailyListVue.slice(-1)[0].weightValue) {
          const firstMoment = this.dailyListVue[0].weightValue;
          const lastMoment = this.dailyListVue.slice(-1)[0].weightValue;
          const height = Math.abs(firstMoment - lastMoment) * 200;
          return height;
        }
      }
      return 2000;
    },
    styles() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        position: 'relative',
      };
    },
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              position: 'right',
              ticks: {
                beginAtZero: false,
                stepSize: 0.2,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MM/DD',
                },
                stepSize: 1,
              },
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
  width: 95vw;
  height: 80vh;
  overflow-x: scroll;
  overflow-y: scroll;
}

.lineChart {
  float: left;
  margin-top: 20px;
}
</style>
