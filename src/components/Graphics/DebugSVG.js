import React from "react";
import PropTypes from "prop-types";
import { GradientPinkBlue } from "@vx/gradient";
import { Text } from "@vx/text";

// TODO: add withDebugSVG, a HOC that wraps a SVG component
// Maybe it would be more appropriate to call it DebugSVGViewBox
function DebugSVG(props) {
  const { width, height, viewBox, margin } = props;
  const outerWidth = width;
  const outerHeight = height;
  const innerWidth = outerWidth - margin.left - margin.right;
  const innerHeight = outerHeight - margin.top - margin.bottom;
  const center = {
    x: margin.left + innerWidth / 2,
    y: margin.top + innerHeight / 2
  };
  const r = 5;
  return (
    <React.Fragment>
      <GradientPinkBlue id="debug-svg-gradient" />
      <g className={"debug-svg"}>
        <rect
          x={0}
          y={0}
          width={outerWidth}
          height={outerHeight}
          style={{ fill: "url(#debug-svg-gradient)", opacity: 0.7 }}
        />
        <Text
          x={0}
          y={0}
          dx={5}
          dy={5}
          verticalAnchor="start"
        >{`${outerWidth} x ${outerHeight}`}</Text>
      </g>
      <g className={"debug-svg-margins"}>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          style={{
            fill: "none",
            stroke: "black",
            strokeWidth: 2,
            strokeDasharray: "4 1"
          }}
        />
        <Text
          x={margin.left}
          y={margin.top}
          dx={5}
          dy={5}
          verticalAnchor="start"
        >{`${innerWidth} x ${innerHeight}`}</Text>
      </g>
      <g className="svg-debug-center">
        <circle cx={center.x} cy={center.y} r={r} style={{ fill: "red" }} />
        <Text x={center.x + r} y={center.y} verticalAnchor="middle">{`(${
          center.x
        }, ${center.y})`}</Text>
      </g>
      <g className={"debug-svg-viewbox"}>
        <Text
          x={margin.left + innerWidth}
          y={margin.top + innerHeight}
          dx={-5}
          dy={-5}
          textAnchor="end"
          verticalAnchor="end"
        >{`Viewbox: ${viewBox}`}</Text>
      </g>
    </React.Fragment>
  );
}

DebugSVG.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  viewBox: PropTypes.string,
  margin: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

export default DebugSVG;
