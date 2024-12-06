import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import theme from '@/styles/theme';

interface LineChartProps {
  data: number[];
  size: 'sm' | 'md';
  colorTheme: 'primary' | 'secondary';
}

Highcharts.setOptions({
  credits: {
    enabled: false,
  },
});

const sizes = {
  sm: { width: 200, height: 106 },
  md: { width: 262, height: 170 },
};

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

const LineChart = ({ data, size, colorTheme }: LineChartProps) => {
  const selectedColors = colors[colorTheme];
  const maxValue = Math.max(...data);

  const options = {
    chart: {
      type: 'areaspline',
      width: sizes[size].width,
      height: sizes[size].height,
      backgroundColor: 'transparent',
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
    yAxis: {
      labels: {
        enabled: false,
      },
      title: {
        text: '',
      },
      tickPositions: [0, maxValue / 3, (maxValue * 2) / 3, maxValue],
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      gridLineTop: 0,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
      area: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        data,
        lineWidth: 2,
        linecap: 'round',
        lineColor: selectedColors.lineColor,
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, selectedColors.middleColor],
            [0.1, selectedColors.fillColor],
            [1, theme.colors.main.white],
          ],
        },
        states: {
          hover: { enabled: false },
        },
      },
    ],
    tooltip: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
