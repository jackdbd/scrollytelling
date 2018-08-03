import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Div = styled.div`
  border-style: dotted;
  font-family: ${props => props.fontFamily};
  &.is-active {
    background-color: ${props => props.activeColor};
  }
`;

const H1 = styled.h1`
  text-align: center;
`;

const StepA = props => {
  const { title, className, activeColor, fontFamily } = props;
  return (
    <Div
      className={className}
      fontFamily={fontFamily}
      activeColor={activeColor}
    >
      <H1>{title}</H1>
      <p>Usually this element (step trigger) contains some text.</p>
    </Div>
  );
};

StepA.defaultProps = {
  title: "Step title here",
  activeColor: "yellow",
  fontFamily: "Arial"
};

StepA.propTypes = {
  title: PropTypes.string,
  activeColor: PropTypes.string,
  fontFamily: PropTypes.string
};

export default StepA;
