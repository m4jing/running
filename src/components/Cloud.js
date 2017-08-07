import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts-wordcloud';
import 'echarts/lib/component/tooltip';

import marathons from './marathons.json';

/**
 * Get unique elements from an array `arr`.
 *
 * @param  {Array} arr Original array
 * @return {Array}     An array with unique elements from `arr`
 */
const unique = (arr) => [...new Set(arr)];

export default class Cloud extends Component {
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
    // .catch((err) => console.log(err))
  }
  resize = () => {
    this.__chart.resize({
      width: 'auto',
      height: 'auto'
    });
  }
  getOption = (dataSrc) => {
    const marathonNames = dataSrc.map((marathon) => marathon.name);
    const uniqueMarathonNames = unique(marathonNames);

    // common analysis
    let serieData = uniqueMarathonNames.map((item) => {
      let maras = dataSrc.filter((marathon) => marathon.name === item);
      return {
        name: maras[0].fullName,
        value: maras.length
      }
    })

    // Year
    // Country
    // Province
    // PB
    // Full Marathon
    // Marathon
    // Finished
    return {
      title: {
        text: '参加过的次数'
      },
      tooltip: {
        show: true
      },
      series: [{
        name: '参加过的次数',
        type: 'wordCloud',
        shape: 'circle',
        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        rotationStep: 15,
        textPadding: 0,
        // size: ['80%', '80%'],
        width: '100%',
        height: '100%',
        autoSize: {
          enable: true,
          minSize: 14
        },
        textStyle: {
          normal: {
            color: () => {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')'
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: serieData
      }]
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
    // this.resize();
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
