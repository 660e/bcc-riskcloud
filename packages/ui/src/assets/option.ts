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
      color: ['#f56c6c', '#e6a23c', '#409eff', '#909399'],
      data: [
        { value: 104, name: '重大风险源' },
        { value: 735, name: '较大风险源' },
        { value: 580, name: '一般风险源' },
        { value: 484, name: '低风险源' }
      ]
    }
  ]
};
