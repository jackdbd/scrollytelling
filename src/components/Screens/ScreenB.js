import React from "react";
import PropTypes from "prop-types";
import Container from "../Container";

const ScreenB = props => {
  const { fontFamily, backgroundColor } = props;
  return (
    <Container fontFamily={fontFamily} backgroundColor={backgroundColor}>
      <h1>Screen B</h1>
      <p>This is Screen B.</p>
    </Container>
  );
};

ScreenB.defaultProps = {
  fontFamily: "Arial",
  backgroundColor: "#d3d3d3"
};

ScreenB.propTypes = {
  fontFamily: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};

export default ScreenB;
