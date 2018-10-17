import React from 'react'
import './style.scss'

const NewPieChart = props => {



  const getDefaultProps = () => {
    return {
      value:10,
      valuelabel:'Completed',
      size:116,
      strokewidth:26
    }
  }



  const size = props.size || getDefaultProps().size
  const strokewidth = props.strokeWidth || getDefaultProps().strokewidth
  const value = props.value || getDefaultProps().value


  const halfsize = (size * 0.5);
  const radius = halfsize - (strokewidth * 0.5);
  const circumference = 2 * Math.PI * radius;
  const strokeval = ((value * circumference) / 100);
  const dashval = (strokeval + ' ' + circumference);

  const trackstyle = {strokeWidth: strokewidth};
  const indicatorstyle = {strokeWidth: strokewidth, strokeDasharray: dashval}
  const rotateval = 'rotate(-90 '+halfsize+','+halfsize+')';

  return(
      <div>
        <svg width={size} height={size} className="donutchart">
          <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track"/>
          <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator"/>
          <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator"/>
          <text className="donutchart-text" x={halfsize} y={halfsize} style={{textAnchor:'middle'}} >
            <tspan className="donutchart-text-val">{value}</tspan>
            <tspan className="donutchart-text-percent">%</tspan>
            <tspan className="donutchart-text-label" x={halfsize} y={halfsize+10}>{getDefaultProps().valuelabel}</tspan>
          </text>
        </svg>
      </div>
  )
}

export default NewPieChart