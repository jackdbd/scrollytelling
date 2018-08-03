import React from "react";
import PropTypes from "prop-types";
import Container from "../Container";

const ScreenA = props => {
  const { fontFamily, backgroundColor } = props;
  return (
    <Container fontFamily={fontFamily} backgroundColor={backgroundColor}>
      <h1>Screen A</h1>
      <p>This is Screen A.</p>
    </Container>
  );
};

ScreenA.defaultProps = {
  fontFamily: "Arial",
  backgroundColor: "#d3d3d3"
};

ScreenA.propTypes = {
  fontFamily: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};

export default ScreenA;
