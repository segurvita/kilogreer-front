<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  computed: {
    datacollection: () => {
      const labels = ['2015', '2016', '2017', '2018'];
      const data = [60, 55, 65, 55];

      return {
        labels,
        datasets: [
          {
            label: 'Weight',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data,
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
    this.$http
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        console.log(response.data);
      });
  },
};
</script>