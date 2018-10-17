import React from 'react'
import './style.scss'

const LineChart = ({data, svgWidth, svgHeight, color}) => {

  const defaultProps = () => {
    return {
      data: [],
      color: 'blue',
      height: 300,
      width: 700
    }
  }

  const getMinX = () => data[0].x
  const getMaxX = () => data[data.length-1].x
  const getMinY = () => data.reduce((min, p) => p.y < min ? p.y : min, data[0].x)
  const getMaxY = () => data.reduce((max, p) => p.y > max ? p.y : max, data[0].y)

  // Final props.
  const finalData = data ? data : defaultProps().data
  const finalSvgWidth = svgWidth ? svgWidth : defaultProps().width
  const finalSvgHeight = svgHeight ? svgHeight : defaultProps().height
  const finalColor = color ? color : defaultProps().color

  // Coordinate helper.
  const getSvgX = x => x / getMaxX() * finalSvgWidth
  const getSvgY = y => y / getMaxY() * finalSvgHeight

  // Make path.
  const makePath = () => {
    let pathD = `M ${+getSvgX(finalData[0].x)} ${+getSvgY(finalData[0].y)} `
    pathD += finalData.map(point => `L ${+getSvgX(point.x)} ${+getSvgY(point.y)} `)
    return (<path className="linechart--path" d={pathD} style={{stroke: finalColor}} />)
  }

  // Make Axis.
  const makeAxis = () => {
    const minX = getMinX()
    const maxX = getMaxX()
    const minY = getMinY()
    const maxY = getMaxY()

    return (
        <g className="linechart--axis">
          <line
              x1={getSvgX(minX)} y1={+getSvgY(minY)}
              x2={getSvgX(maxX)} y2={+getSvgY(minY)} />

          <line
              x1={getSvgX(minX)} y1={+getSvgY(minY)}
              x2={getSvgX(minX)} y2={+getSvgY(maxY)} />
        </g>
    )
  }

  return(
      <svg viewBox={`0 0 ${finalSvgWidth} ${finalSvgHeight}`}>
        {makePath()}
        {makeAxis()}

      </svg>
  )
}

export default LineChart