import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  text-align: center;
  background-color: ${props => props.backgroundColor};
  font-family: ${props => props.fontFamily};
`;

Container.defaultProps = {
  fontFamily: "Arial",
  backgroundColor: "#d3d3d3"
};

Container.propTypes = {
  fontFamily: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};

export default Container;
