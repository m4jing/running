import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts-wordcloud';
import 'echarts/lib/component/tooltip';

export default class Cloud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marathons: []
    }

    fetch('/data/marathons.json')
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        marathons: res
      });
    })
    .catch((err) => console.log(err))
  }
  resize = () => {
    this.__chart.resize({
      width: 'auto',
      height: 'auto'
    });
  }
  getOption = (props) => ({
    title: {
      text: props.title
    },
    tooltip: {
      show: true
    },
    series: [{
      name: props.title,
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
      data: props.data
    }]
  })
  renderChart = (renderTo) => {

    let option = {
      title: {
        text: '参加过的次数',
        link: 'http://www.google.com/trends/hottrends'
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
        data: [
          {
            name: "Sam S Club",
            value: 10000
          },
          {
            name: "Macys",
            value: 6181
          },
          {
            name: "Amy Schumer",
            value: 4386
          },
          {
            name: "Jurassic World",
            value: 4055
          },
          {
            name: "Charter Communications",
            value: 2467
          },
          {
            name: "Chick Fil A",
            value: 2244
          },
          {
            name: "Planet Fitness",
            value: 1898
          },
          {
            name: "Pitch Perfect",
            value: 1484
          },
          {
            name: "Express",
            value: 1112
          },
          {
            name: "Home",
            value: 965
          },
          {
            name: "Johnny Depp",
            value: 847
          },
          {
            name: "Lena Dunham",
            value: 582
          },
          {
            name: "Lewis Hamilton",
            value: 555
          },
          {
            name: "KXAN",
            value: 550
          },
          {
            name: "Mary Ellen Mark",
            value: 462
          },
          {
            name: "Farrah Abraham",
            value: 366
          },
          {
            name: "Rita Ora",
            value: 360
          },
          {
            name: "Serena Williams",
            value: 282
          },
          {
            name: "NCAA baseball tournament",
            value: 273
          },
          {
            name: "Point Break",
            value: 265
          }
        ]
      }]
    };

    this.__chart = echarts.init(renderTo);
    this.__chart.setOption(option);
  }
  componentDidMount() {
    window.addEventListener('resize', this.resize);
    let renderTo = this.refs.root;

    this.renderChart(renderTo);
    this.resize();
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
