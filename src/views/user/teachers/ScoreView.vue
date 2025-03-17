<script setup lang="ts">
import { onMounted } from "vue";
import service from "../../../request/service";
import * as echarts from "echarts";
//获取雷达图相关数据
const id = "";

const tableData = [
  {
    name: "张三",
    score: 100,
    rank: 1,
  },
  {
    name: "李四",
    score: 90,
    rank: 2,
  },
  {
    name: "王五",
    score: 80,
    rank: 3,
  },
  {
    name: "赵六",
    score: 70,
    rank: 4,
  },
];

const fetchData = async (id: undefined) => {
  const res = await service.get(`getScore/${id}`).then((res) => {
    console.log("雷达图数据", res);
    if (res.data.code === 200) {
      console.log("放回结果是：", res.data.data);
    }
  });
  console.log("雷达图数据", res);
};

const handleClick = (row) => {
  console.log("点击了", row);
  //跳转到评分细则页面

  if (row.score === 0 || row.score === "暂无评分") {
    console.log("暂无评分");
    console.log("id");

    fetchData(row.id);
  }
};


// 初始化雷达图
const initChart()=>{
  //雷达图
  const radarChart = echarts.init(document.getElementById("radarChart"));
  const radarOption = {
    title: {
      text: "雷达图",
    },
    tooltip: {},
    legend: {
      data: ["得分"],
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "语音", max: 100 },
        { name: "表达", max: 100 },
        { name: "情感", max: 100 },
        { name: "逻辑", max: 100 },
        { name: "思维", max: 100 },
      ],
    },
    series: [
      {
        name: "得分",
        type: "radar",
        // areaStyle: {normal: {}},
        data: [
          {
            value: [90, 80, 70, 60, 50],
            name: "得分",
          },
        ],
      },
    ],
  };
  radarChart.setOption(radarOption);
};
onMounted(() => {
  // fetchData();
});
</script>
<template>
  <div>
    <!-- 查看自己小组得分情况 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <!-- //点击这里的得分跳到详细得分页面 -->

      <el-table-column
        prop="score"
        label="通话评分(点击分数可查看评分细则)"
        min-width="155"
      >
        <template v-slot="scope">
          <div style="position: relative; width: 100%; height: 100%">
            <span
              :class="{
                'no-click':
                  scope.row.score === 0 || scope.row.score === '暂无评分',
              }"
              @click="handleClick(scope.row)"
              style="
                cursor: pointer;
                width: 100%;
                height: 100%;
                display: inline-block;
              "
            >
              {{ scope.row.score }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="rank" label="排名"></el-table-column>
    </el-table>
  </div>
</template>
