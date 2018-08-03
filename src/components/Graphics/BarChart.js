import React, { Component } from "react";
import PropTypes from "prop-types";
import { format as d3Format } from "d3-format";
import { Bar } from "@vx/shape";
import { AxisLeft, AxisBottom } from "@vx/axis";
import ResizeAware from "react-resize-aware";
import D3MarginConvention from "./D3MarginConvention";
import DebugSVG from "./DebugSVG";

function BarChart(props) {
  const {
    width,
    height,
    margin,
    data,
    scales,
    accessors,
    axisFormatSpecifiers,
    showDebug,
    handleMouseOver
  } = props;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xScale = scales.x.range([0, innerWidth]);
  const yScale = scales.y
    .range([innerHeight, 0])
    .round(true)
    .paddingInner(0.2);

  const viewBox = props.viewBox ? props.viewBox : `0 0 ${width} ${height}`;

  /*
    A chart might not have any event handlers. Also, when it has one, we need to
    convert it to a thunk. This is because in vx props that are functions need
    to be thunks.
    https://github.com/hshoff/vx/issues/50
  */
  const onMouseEnter = handleMouseOver
    ? d => event => handleMouseOver(event, d)
    : undefined;

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      preserveAspectRatio="xMinYMin meet"
    >
      {showDebug && (
        <DebugSVG
          width={width}
          height={height}
          viewBox={viewBox}
          margin={margin}
        />
      )}
      <D3MarginConvention top={margin.top} left={margin.left}>
        <g className={"bars"}>
          {data.map((d, i) => {
            return (
              <Bar
                x={0}
                y={yScale(accessors.y(d))}
                width={xScale(accessors.x(d))}
                height={yScale.bandwidth()}
                data={{ x: accessors.x(d), y: accessors.y(d) }}
                id={`#bar-${i}`}
                key={i}
                onMouseEnter={onMouseEnter}
              />
            );
          })}
        </g>
        <AxisLeft
          top={0}
          left={0}
          scale={yScale}
          stroke="#000000"
          tickStroke="#000000"
          tickLabelProps={(d, i) => ({
            textAnchor: "end",
            dx: "-0.25em",
            dy: "0.25em"
          })}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <text {...tickProps}>{formattedValue}</text>
          )}
        />
        <AxisBottom
          top={innerHeight}
          left={0}
          scale={xScale}
          label="X Label"
          labelProps={{
            fontSize: "1.0rem",
            x: `${innerWidth}px`,
            textAnchor: "end",
            y: "0em",
            dy: "-0.5em"
          }}
          tickFormat={d => {
            return `${d3Format(axisFormatSpecifiers.x)(d)}`;
          }}
          tickLabelProps={(d, i) => ({
            dx: "-0.75em",
            dy: "0.25em"
          })}
        />
        */}
      </D3MarginConvention>
    </svg>
  );
}

BarChart.defaultProps = {
  width: 600,
  height: 400,
  margin: {
    top: 20,
    right: 25,
    bottom: 40,
    left: 30
  },
  data: [],
  accessors: {
    x: d => d.x,
    y: d => d.y
  },
  axisFormatSpecifiers: {
    x: ".1f",
    y: ""
  },
  showDebug: false
};

BarChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  }),
  data: PropTypes.array.isRequired,
  accessors: PropTypes.objectOf(PropTypes.func).isRequired,
  scales: PropTypes.objectOf(PropTypes.func).isRequired,
  axisFormatSpecifiers: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string
  }),
  viewBox: PropTypes.string,
  showDebug: PropTypes.bool
};

class ResponsiveBarChart extends Component {
  /*
    It seems that ResizeAware have `undefined` width and height the first 2
    times it is rendered (i.e. before `handleResize` kicks in). Obviously we
    don't want to pass `undefined` width and height to the BarChart component.
    I tried to use conditional rendering of ResizeAware without success. I guess
    it is ResizeAware that should use conditional rendering if its width and
    height are still undefined.
  */
  state = {
    width: 100,
    height: 100
  };

  handleResize = props => {
    const { width, height } = props;
    this.setState({
      width,
      height
    });
  };

  render() {
    const responsiveWidth = this.state.width;
    const barChartProps = { ...this.props, width: responsiveWidth };
    return (
      <ResizeAware
        style={{ position: "relative" }}
        onlyEvent
        onResize={this.handleResize}
      >
        <BarChart {...barChartProps} />
      </ResizeAware>
    );
  }
}

const responsiveBarChartdefaultProps = Object.keys(BarChart.defaultProps)
  .filter(d => d !== "width" && d !== "height")
  .reduce((accumulator, key) => {
    return Object.assign(accumulator, { [key]: BarChart.defaultProps[key] });
  }, {});

ResponsiveBarChart.defaultProps = {
  ...responsiveBarChartdefaultProps
};

const responsiveBarChartPropTypes = Object.keys(BarChart.propTypes)
  .filter(d => d !== "width" && d !== "height")
  .reduce((accumulator, key) => {
    return Object.assign(accumulator, { [key]: BarChart.propTypes[key] });
  }, {});

ResponsiveBarChart.propTypes = {
  ...responsiveBarChartPropTypes
};

export { BarChart, ResponsiveBarChart };
