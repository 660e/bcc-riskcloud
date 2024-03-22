export const legend = [
  { name: '重大风险源', color: '#f56c6c' },
  { name: '较大风险源', color: '#e6a23c' },
  { name: '一般风险源', color: '#409eff' },
  { name: '低风险源', color: '#909399' }
];

export const option = {
  tooltip: {
    trigger: 'item',
    position: (point: [number, number]) => [point[0] + 20, point[1] + 20]
  },
  series: [
    {
      name: '风险源',
      type: 'pie',
      radius: ['60%', '90%'],
      itemStyle: {
        borderRadius: 4
      },
      label: {
        show: false
      },
      color: legend.map(c => c.color),
      data: legend.map(c => {
        return {
          name: c.name,
          value: Math.floor(Math.random() * 1000)
        };
      })
    }
  ]
};
