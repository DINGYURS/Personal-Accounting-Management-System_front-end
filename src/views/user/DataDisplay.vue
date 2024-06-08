<template>
  <div class="top">
    <el-row style="text-align: center">
      <el-col :span="8">
        <div class="year" style="border-bottom-color: #e06c67">
          {{ `${selected_date[0]} 年` }}
        </div>
        <div class="month">{{ `${selected_date[1]} 月` }}</div>
        <el-cascader
          v-model="selected_date"
          :options="options"
          :props="props"
          size="default"
          @change="handleChange"
        />
      </el-col>
      <el-col :span="8">
        <div class="year" style="border-bottom-color: #5ba5e0">支出:</div>
        <div class="month">
          ￥{{ payData.reduce((a, b) => a + b, 0).toFixed(2) }}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="year" style="border-bottom-color: #dce067">收入:</div>
        <div class="month">
          ￥{{ incomeData.reduce((a, b) => a + b, 0).toFixed(2) }}
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="middle">
    <div class="payTrend">
      <div style="padding: 20px 0 0 20px">支出趋势</div>
      <div ref="payTrendGraphic" class="payTrendGraphic"></div>
    </div>
  </div>
  <div class="bottom">
    <div class="bottom_inside">
      <div class="paySort">
        <div style="padding: 20px 0 0 20px">支出分类</div>
        <div ref="paySortGraphic" class="paySortGraphic"></div>
      </div>
      <div class="expenseCategoryRank">
        <div style="padding: 20px 0 0 20px">支出分类排行</div>
        <div ref="categoryRankGraphic" class="categoryRankGraphic"></div>
      </div>
      <div class="expenseRank">
        <div style="padding: 20px 0 0 20px">支出排行</div>
        <div ref="expenseRankGraphic" class="expenseRankGraphic"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, inject, ref } from 'vue'
import { getAccountInfoByMonth } from '@/api/account/accountInfo.js'

const selected_date = ref([new Date().getFullYear(), new Date().getMonth() + 1])
const options = [
  {
    value: '2022',
    label: '2022',
    children: [
      {
        value: '1',
        label: '一月'
      },
      {
        value: '2',
        label: '二月'
      },
      {
        value: '3',
        label: '三月'
      },
      {
        value: '4',
        label: '四月'
      },
      {
        value: '5',
        label: '五月'
      },
      {
        value: '6',
        label: '六月'
      },
      {
        value: '7',
        label: '七月'
      },
      {
        value: '8',
        label: '八月'
      },
      {
        value: '9',
        label: '九月'
      },
      {
        value: '10',
        label: '十月'
      },
      {
        value: '11',
        label: '十一月'
      },
      {
        value: '12',
        label: '十二月'
      }
    ]
  },
  {
    value: '2023',
    label: '2023',
    children: [
      {
        value: '1',
        label: '一月'
      },
      {
        value: '2',
        label: '二月'
      },
      {
        value: '3',
        label: '三月'
      },
      {
        value: '4',
        label: '四月'
      },
      {
        value: '5',
        label: '五月'
      },
      {
        value: '6',
        label: '六月'
      },
      {
        value: '7',
        label: '七月'
      },
      {
        value: '8',
        label: '八月'
      },
      {
        value: '9',
        label: '九月'
      },
      {
        value: '10',
        label: '十月'
      },
      {
        value: '11',
        label: '十一月'
      },
      {
        value: '12',
        label: '十二月'
      }
    ]
  },
  {
    value: '2024',
    label: '2024',
    children: [
      {
        value: '1',
        label: '一月'
      },
      {
        value: '2',
        label: '二月'
      },
      {
        value: '3',
        label: '三月'
      },
      {
        value: '4',
        label: '四月'
      },
      {
        value: '5',
        label: '五月'
      },
      {
        value: '6',
        label: '六月'
      },
      {
        value: '7',
        label: '七月'
      },
      {
        value: '8',
        label: '八月'
      },
      {
        value: '9',
        label: '九月'
      },
      {
        value: '10',
        label: '十月'
      },
      {
        value: '11',
        label: '十一月'
      },
      {
        value: '12',
        label: '十二月'
      }
    ]
  }
]
const props = {
  expandTrigger: 'hover'
}
const $echarts = inject('echarts')
const payTrendGraphic = ref(null)
const paySortGraphic = ref(null)
const categoryRankGraphic = ref(null) // 引用横向柱状图的 DOM 元素
const expenseRankGraphic = ref(null) // 引用支出排行图表的 DOM 元素
const payData = ref([]) // 用于存储按天统计的支出数据
const incomeData = ref([]) // 用于存储按天统计的收入数据
const pieData = ref([]) // 用于存储饼图数据
const categoryRankData = ref([]) // 用于存储前五个标签的数据
const expenseRankData = ref([]) // 用于存储单个金额最大的5个数据

const handleChange = (value) => {
  console.log(value)
  getAccountInfo() // 日期改变时重新获取数据
}

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate()
}

const getAccountInfo = async () => {
  try {
    const [year, month] = selected_date.value
    const daysInMonth = getDaysInMonth(year, month)
    const response = await getAccountInfoByMonth(selected_date.value)
    const accountInfoList = response.data.data
    console.log(accountInfoList)

    // 按天统计支出和收入数据
    const dailyExpenses = new Array(daysInMonth).fill(0)
    const dailyIncomes = new Array(daysInMonth).fill(0)
    const expenseCategories = {}
    const expenseList = []

    accountInfoList.forEach((item) => {
      const day = new Date(item.createTime).getDate() - 1 // 获取日期
      if (item.type === 1) {
        // 支出
        dailyExpenses[day] += Number(item.price)
        if (expenseCategories[item.tag]) {
          expenseCategories[item.tag] += Number(item.price)
        } else {
          expenseCategories[item.tag] = Number(item.price)
        }
        expenseList.push({ note: item.note, price: Number(item.price) })
      } else if (item.type === 2) {
        // 收入
        dailyIncomes[day] += Number(item.price)
      }
    })

    console.log(dailyExpenses)
    console.log(dailyIncomes)
    payData.value = dailyExpenses
    incomeData.value = dailyIncomes

    pieData.value = Object.keys(expenseCategories).map((key) => ({
      value: expenseCategories[key],
      name: key
    }))

    // 获取前五个标签数据
    const sortedCategories = Object.entries(expenseCategories).sort(
      (a, b) => b[1] - a[1]
    )
    categoryRankData.value = sortedCategories
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }))
      .reverse()

    // 获取单个金额最大的5个数据
    const sortedExpenses = expenseList.sort((a, b) => b.price - a.price)
    expenseRankData.value = sortedExpenses.slice(0, 5).reverse()

    updateCharts(daysInMonth)
  } catch (error) {
    console.error('Failed to fetch AccountInfo data by month:', error)
  }
}

const updateCharts = (daysInMonth) => {
  const line = $echarts.init(payTrendGraphic.value, null, {
    renderer: 'canvas'
  })
  const pie = $echarts.init(paySortGraphic.value, null, { renderer: 'canvas' })
  const bar = $echarts.init(categoryRankGraphic.value, null, {
    renderer: 'canvas'
  }) // 初始化横向柱状图
  const expenseBar = $echarts.init(expenseRankGraphic.value, null, {
    renderer: 'canvas'
  }) // 初始化支出排行图表

  const option1 = {
    tooltip: {
      trigger: 'axis', // 'axis' 表示显示整个轴上的数据，'item' 表示单个数据项
      axisPointer: {
        type: 'line', // 指针类型，可以是 'line'（线），'shadow'（阴影），'none'（无），'cross'（十字线）
        label: {
          backgroundColor: '#6a7985' // 标签背景色
        }
      }
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      axisLabel: {
        formatter: '{value} 日'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 元'
      }
    },
    series: [
      {
        name: '支出',
        data: payData.value,
        type: 'line',
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: '平均值' }]
        }
      }
    ]
  }

  const option2 = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : ￥{c} ({d}%)'
    },
    legend: {
      top: '0%',
      left: 'center'
    },
    series: [
      {
        name: '支出分类',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        label: {
          show: false,
          position: 'center',
          formatter: '{b} : ￥{c} ({d}%)' // 显示标签、金额和百分比
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
            formatter: '{b}' // 显示标签、金额和百分比
          }
        },
        labelLine: {
          show: false
        },
        data: pieData.value
      }
    ]
  }

  const option3 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: categoryRankData.value.map((item) => item.name)
    },
    series: [
      {
        type: 'bar',
        data: categoryRankData.value.map((item) => item.value)
      }
    ]
  }

  const option4 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: expenseRankData.value.map((item) => item.note)
    },
    series: [
      {
        type: 'bar',
        data: expenseRankData.value.map((item) => item.price)
      }
    ]
  }

  line.setOption(option1)
  pie.setOption(option2)
  bar.setOption(option3)
  expenseBar.setOption(option4)

  window.addEventListener('resize', () => {
    line.resize()
    pie.resize()
    bar.resize()
    expenseBar.resize() // 调整支出排行图表的大小
  })
}

onMounted(() => {
  getAccountInfo()
})
</script>

<style scoped>
.top {
  height: 15vh;
}

.year {
  font-weight: 100;
  font-size: 40px;
  border-bottom: 2px solid;
}

.month {
  font-weight: bolder;
  font-size: 40px;
}

.middle {
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-size: 30px;
}

.payTrend {
  width: 98%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}

.payTrendGraphic {
  width: 100%;
  height: 90%;
}

.bottom {
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-size: 30px;
  margin-top: 20px;
}

.bottom_inside {
  width: 98%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
}

.paySort,
.expenseCategoryRank,
.expenseRank {
  width: 33.33%;
  height: 100%;
}

.paySortGraphic {
  height: 90%;
}

.categoryRankGraphic {
  height: 80%;
}

.expenseRankGraphic {
  height: 80%;
}
</style>
