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
// const unique = (arr) => [...new Set(arr)];

/**
 * Get serie-format data(for ECharts) from an array `arr`.
 *
 * @param  {Array} arr Original array
 * @return {Array}     An array containing data with serie-format from `arr`
 *
 * Example result: [{name: 'xxx', value: 1}]
 */
const getSerieData = (arr) => {
  // counting elements
  let counted = arr.reduce((acc, c) => {
    if (c in acc) {
      acc[c]++;
    } else {
      acc[c] = 1;
    }
    return acc;
  }, {});

  let result = [];
  for (let i in counted) {
    if (counted.hasOwnProperty(i)) {
      result.push({
        name: i,
        value: counted[i]
      })
    }
  }
  return result;
}

const categoryMapping = {
  minimarathon: '迷你马拉松',
  halfmarathon: '半程马拉松',
  marathon: '全程马拉松',
  trail: '越野赛',
  plank: '平板支撑',
  finished: '完赛'
}

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
    // FullName
    const gameFullNames = dataSrc.map((game) => game.fullName);

    // common analysis (name)
    // const gameNames = dataSrc.map((game) => game.name);
    // const uniqueGameNames = unique(gameNames);
    //
    // let nameSerieData = uniqueGameNames.map((item) => {
    //   let maras = dataSrc.filter((game) => game.name === item);
    //   return {
    //     name: maras[0].fullName,
    //     value: maras.length
    //   }
    // })

    // Year
    const gameYears = dataSrc.map((game) => game.datetime.slice(0, 4)+'年');

    // Country
    const gameCountries = dataSrc.map((game) => game.location.country);

    // Province
    const gameProvinces = dataSrc.map((game) => game.location.province);

    // City
    const gameCities = dataSrc.map((game) => game.location.city);

    // PB
    const gamePBs = dataSrc
      .filter((game) => game.tags.includes('PB'))
      .map((i) => 'PB');

    // Full Marathon
    // Marathon
    const gameCategories = dataSrc.map((game) => categoryMapping[game.type]);

    // Finished
    const gameResults = dataSrc.map((game) => categoryMapping[game.result]);

    let gameSerieRawData = [
      gameFullNames,
      gameYears,
      gameCountries,
      gameProvinces,
      gameCities,
      gamePBs,
      gameCategories,
      gameResults
    ]

    let gameSeries = gameSerieRawData
      .map((gameSerie) => getSerieData(gameSerie))
      .reduce((acc, c) => acc.concat(c), []);

    return {
      title: {
        text: '曾经脚下的路',
        left: 'center',
        textStyle: {
          color: '#555',
          fontSize: 12
        }
      },
      tooltip: {
        show: true
      },
      series: [{
        name: 'Times Realized',
        type: 'wordCloud',
        shape: 'circle',
        sizeRange: [12, 36],
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
        data: gameSeries
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
