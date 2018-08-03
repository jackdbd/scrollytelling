import React from "react";
import PropTypes from "prop-types";
import Container from "../Container";

const Outro = props => {
  const { fontFamily, backgroundColor } = props;
  return (
    <Container fontFamily={fontFamily} backgroundColor={backgroundColor}>
      <h1>Outro</h1>
      <p>Use this screen to draw your conclusions. Add credits.</p>
    </Container>
  );
};

Outro.defaultProps = {
  fontFamily: "Arial",
  backgroundColor: "#d3d3d3"
};

Outro.propTypes = {
  fontFamily: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};

export default Outro;
