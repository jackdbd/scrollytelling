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
  text-align: left;
`;

const Ul = styled.ul`
  list-style-type: upper-roman;
`;

const StepB = props => {
  const { title, className, activeColor, fontFamily } = props;
  const instructions = ["Scroll", "Look at the data", "Scroll some more"];
  return (
    <Div
      className={className}
      fontFamily={fontFamily}
      activeColor={activeColor}
    >
      <H1>{title}</H1>
      <Ul>
        {instructions.map((d, i) => {
          return <li key={i}>{d}</li>;
        })}
      </Ul>
    </Div>
  );
};

StepB.defaultProps = {
  title: "Step title here",
  activeColor: "yellow",
  fontFamily: "Arial"
};

StepB.propTypes = {
  title: PropTypes.string,
  activeColor: PropTypes.string,
  fontFamily: PropTypes.string
};

export default StepB;
