import { EChartsOption } from 'echarts';

export const barOption = ({ data, color }: { data: any; color?: string[] }): EChartsOption => {
  const option: EChartsOption = {
    tooltip: { trigger: 'axis' },
    legend: { top: '2%' },
    grid: { top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true },
    xAxis: [{ type: 'category', data: data.data.map((e: any) => e.name) }],
    yAxis: [{ type: 'value' }],
    series: [
      {
        name: '重大',
        type: 'bar',
        stack: 'a',
        emphasis: { focus: 'series' },
        data: data.data.map((e: any) => e.value[0])
      },
      {
        name: '较大',
        type: 'bar',
        stack: 'a',
        emphasis: { focus: 'series' },
        data: data.data.map((e: any) => e.value[1])
      },
      {
        name: '一般',
        type: 'bar',
        stack: 'a',
        emphasis: { focus: 'series' },
        data: data.data.map((e: any) => e.value[2])
      },
      {
        name: '低',
        type: 'bar',
        stack: 'a',
        emphasis: { focus: 'series' },
        data: data.data.map((e: any) => e.value[3])
      }
    ]
  };

  if (color) option.color = color;

  return option;
};

export const pieOption = ({ data, radius, color }: { data: any; radius: [string, string]; color?: string[] }): EChartsOption => {
  const option: EChartsOption = {
    tooltip: { trigger: 'item' },
    legend: { top: '2%', right: '2%', orient: 'vertical' },
    series: [
      {
        name: data.name,
        type: 'pie',
        radius,
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false, position: 'center' },
        emphasis: {
          label: { show: true, fontSize: 18, fontWeight: 'bold' }
        },
        labelLine: { show: false },
        data: data.data
      }
    ]
  };

  if (color) option.color = color;

  return option;
};
