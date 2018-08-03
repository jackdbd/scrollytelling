import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Container from "../Container";

const P = styled.p`
  ::before {
    content: "↓ ";
  }
  ::after {
    content: " ↓";
  }
`;

const Intro = props => {
  const { title, fontFamily, backgroundColor } = props;
  return (
    <Container fontFamily={fontFamily} backgroundColor={backgroundColor}>
      <h1>{title}</h1>
      <p>
        Use this screen to introduce the topic. Add relevant links to previous
        research.
      </p>
      <P>Scroll to start</P>
    </Container>
  );
};

Intro.defaultProps = {
  title: "Intro title",
  fontFamily: "Arial",
  backgroundColor: "#d3d3d3"
};

Intro.propTypes = {
  title: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};

export default Intro;
