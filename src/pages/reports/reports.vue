<template>
  <div>
    <el-card>
      <div id="lineChart" style="width: 750px; height: 400px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { createNamespacedHelpers } from 'vuex'
const reportsModule =createNamespacedHelpers('reports')
const { mapState: reportsState, mapMutations: reportsMutations, mapActions: reportsActions } = reportsModule
export default {
  data() {
    return {
      charts: ""
    };
  },
  components: {},
  methods: {
      ...reportsActions(["getReports"]),
    // 初始化图表
    drawCharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("lineChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "数据报表"
        },
        legend: this.reportsData.legend,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        xAxis: this.reportsData.xAxis,
        yAxis: this.reportsData.yAxis,
        series: this.reportsData.series
      });
    }
  },
  mounted() {
    this.getReports();
    setTimeout(() => {
      this.drawCharts();
    }, 800);
  },
  watch: {},
  computed: {
    ...reportsState(["reportsData"])
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
</style>