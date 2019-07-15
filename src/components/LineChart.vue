<script>
import { mapGetters, mapActions } from 'vuex';
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
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
  mounted() {
    this.renderChart(this.datacollection, this.options);
  },
  created() {
    this.getList();

    // this.times = ['2015', '2016', '2017', '2018'];
    // this.weights = [60, 55, 65, 55];
  },
  methods: {
    ...mapActions('weights', ['getList']),
  },
};
</script>