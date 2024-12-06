import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import theme from '@/styles/theme';

interface LineChartProps {
  lineData: { label: string; data: number[] }[];
  areaData: { label: string; data: number[] }[];
}

Highcharts.setOptions({
  credits: {
    enabled: false,
  },
});

const colors = {
  primary: {
    lineColor: theme.colors.main.primary,
    middleColor: theme.colors.teal[100],
    fillColor: theme.colors.teal[200],
  },
  secondary: {
    lineColor: '#EE9D1A',
    middleColor: '#FFC90A',
    fillColor: '#FFDB5E',
  },
};

const StrategyChart = ({ lineData, areaData }: LineChartProps) => {
  const options = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      width: 900,
    },
    accessibility: {
      enabled: false,
    },
    title: {
      text: '',
    },
    xAxis: {
      visible: false,
    },
    yAxis: [
      {
        labels: {
          style: { color: colors.primary.fillColor },
          format: `{value:,.0f}`,
        },
        title: {
          enabled: false,
        },
        gridLineWidth: 1,
        opposite: false,
      },
      {
        labels: {
          style: { color: colors.primary.lineColor },
        },
        title: {
          enabled: false,
        },
        gridLineWidth: 1,
        opposite: true,
      },
    ],
    legend: {
      enabled: true,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
        states: {
          inactive: {
            opacity: 0.2,
          },
        },
      },
      area: {
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            enabled: true,
            brightness: 0.8,
          },
        },
      },
    },
    series: [
      ...areaData.map((dataItem, idx) => ({
        type: 'areaspline',
        name: dataItem.label,
        data: dataItem.data,
        lineWidth: 0,
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops:
            idx === 0
              ? [
                  [0, colors.primary.middleColor],
                  [1, colors.primary.fillColor],
                ]
              : [
                  [0, colors.primary.lineColor],
                  [1, colors.primary.fillColor],
                ],
        },
        fillOpacity: 0.7,
        states: {
          hover: { enabled: true },
        },
        tooltip: {
          pointFormat: `
                ${dataItem.label}: <b style="color:${colors.primary.lineColor}">{point.y}</b>원<br/>
              `,
        },
        yAxis: 0,
      })),
      ...lineData.map((item) => ({
        type: 'spline',
        name: item.label,
        data: item.data,
        lineWidth: 2,
        color: colors.primary.lineColor,
        yAxis: 1,
        tooltip: {
          pointFormat: `
              ${item.label}: <b style="color:${colors.primary.lineColor}">{point.y}</b>%
            `,
        },
      })),
    ],
    tooltip: {
      shared: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StrategyChart;
