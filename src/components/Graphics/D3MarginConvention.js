import React from "react";
import PropTypes from "prop-types";

// https://bl.ocks.org/mbostock/3019563
function D3MarginConvention(props) {
  return (
    <g
      className={"d3-margin-convention"}
      transform={`translate(${props.left}, ${props.top})`}
    >
      {/* TODO: how to pass the "key" prop to each child component? */}
      {props.children}
    </g>
  );
}

D3MarginConvention.defaultProps = {
  top: 0,
  left: 0
};

D3MarginConvention.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

export default D3MarginConvention;
