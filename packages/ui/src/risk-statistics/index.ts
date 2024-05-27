import { EChartsOption } from 'echarts';

export const barOption = (): EChartsOption => {
  return {
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    grid: {
      top: '2%',
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'bar',
        stack: 'a',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'bar',
        stack: 'a',
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'bar',
        stack: 'a',
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  };
};

export const pieOption = ({ data, radius, color }: { data: any; radius?: [string, string]; color?: string[] }): EChartsOption => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '0',
      right: '0',
      orient: 'vertical'
    },
    color,
    series: [
      {
        name: data.name,
        type: 'pie',
        radius,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 24,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data.data
      }
    ]
  };
};
