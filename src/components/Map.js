import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';

import 'echarts/map/js/china';

import { getSerieData, convertData } from '../utils';

import marathons from './marathons.json';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marathons: marathons
    }

    // fetch('/data/marathons.json')
    // .then((res) => res.json())
    // .then((res) => {
    //   this.setState({
    //     marathons: res
    //   });
    // })
    // .catch((err) => console.log(err));
  }
  resize = () => this.__chart.resize()
  getOption = (dataSrc) => {
    const gameCities = dataSrc.map((game) => game.location.city);

    return {
      backgroundColor: '#404a59',
      title: {
        text: '曾梦想仗剑走天涯',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      },
      tooltip : {
        trigger: 'item',
        formatter: (params) => {
          return `
            ${params.seriesName}<br />
            ${params.name}: ${params.value[2]}次
          `
        }
      },
      // legend: {
      //   orient: 'vertical',
      //   y: 'bottom',
      //   x:'right',
      //   data:['pm2.5', 'Top 5'],
      //   textStyle: {
      //     color: '#fff'
      //   }
      // },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#fff'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      series: [
        // {
        //   name: 'Test',
        //   type: 'scatter',
        //   coordinateSystem: 'geo',
        //   data: convertData(data),
        //   symbolSize: function (val) {
        //     return val[2] / 10;
        //   },
        //   label: {
        //     normal: {
        //       formatter: '{b}',
        //       position: 'right',
        //       show: false
        //     },
        //     emphasis: {
        //       show: true
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: '#ddb926'
        //     }
        //   }
        // },
        {
          name: 'Traveled',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(getSerieData(gameCities)),
          // data: convertData(data.sort(function (a, b) {
          //   return b.value - a.value;
          // }).slice(0, 6)),
          symbolSize: (val) => (Math.sqrt(val[2]) * 10),
          // symbolSize: function (val) {
          //   return val[2] / 10;
          // },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          // zlevel: 1
        }
      ]
    }
  }
  renderChart = (renderTo) => {
    this.__chart = echarts.init(renderTo);
    this.__chart.setOption(this.getOption(this.state.marathons));
  }
  componentDidMount() {
    window.addEventListener('resize', this.resize);

    let renderTo = this.refs.root;
    this.renderChart(renderTo);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);

    if (this.__chart) {
      this.__chart.dispose();
      this.__chart = null;
    }
  }
  render() {
    return (
      <div ref="root" className="module"></div>
    );
  }
}
