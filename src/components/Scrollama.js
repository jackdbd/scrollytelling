import React, { Component } from "react";
import PropTypes from "prop-types";
import "intersection-observer"; // polyfill for the IntersectionObserver API
import scrollama from "scrollama";
import styled from "styled-components";

/*
  CSS Grid auto-fit for responsiveness: https://gridbyexample.com/examples/example37/
  Common CSS breakpoints: https://stackoverflow.com/questions/6370690/media-queries-how-to-target-desktop-tablet-and-mobile#7354648
*/
const ScrollContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(321px, 1fr));
  grid-gap: 10px;
  background-color: ${props => props.backgroundColor};
  font-family: ${props => props.fontFamily};
`;

const ScrollGraphic = styled.div`
  position: sticky;
  top: 0;
  border-style: dashed;
  height: ${props => props.height}px;
  background-color: ${props => props.backgroundColor};
`;

const ScrollText = styled.div`
  padding: 1rem;
  border-style: dashed;
  background-color: ${props => props.backgroundColor};
`;

class Scrollama extends Component {
  state = {
    scroller: scrollama(),
    index: 0,
    progress: 0,
    direction: "down"
  };

  componentDidMount() {
    this.setupScrollerInstance();
  }

  componentDidUpdate() {
    console.log("Scrollama.componentDidUpdate");
    this.handleResize();
  }

  handleResize() {
    console.log("Scrollama.handleResize");
    this.state.scroller.resize();
  }

  handleStepEnter = response => {
    console.log("Scrollama.handleStepEnter", response);
    this.setState({
      index: response.index,
      direction: response.direction
    });
  };

  handleStepProgress = response => {
    console.log("Scrollama.handleStepProgress", response);
    this.setState({ progress: response.progress });
  };

  handleStepExit = response => {
    console.log("Scrollama.handleStepExit", response);
  };

  handleContainerEnter = response => {
    console.log("Scrollama.handleContainerEnter", response);
  };

  handleContainerExit = response => {
    console.log("Scrollama.handleContainerExit", response);
  };

  setupScrollerInstance = () => {
    const opt = this.props.options;
    const options = {
      ...opt,
      container: `.${opt.container}`,
      graphic: `.${opt.graphic}`,
      text: `.${opt.text}`,
      step: `.${opt.step}`
    };
    this.state.scroller
      .setup(options)
      .onStepEnter(this.handleStepEnter)
      .onStepProgress(this.handleStepProgress)
      .onStepExit(this.handleStepExit)
      .onContainerEnter(this.handleContainerEnter)
      .onContainerExit(this.handleContainerExit);
  };

  render() {
    const { index, progress, direction } = this.state;
    const { options, steps, graphic, fontFamily } = this.props;
    const GraphicComponent = graphic.component;
    const graphicProps = {
      ...graphic.props,
      fontFamily,
      data: graphic.props.data[index]
    };
    return (
      <ScrollContainer
        className={options.container}
        backgroundColor={"yellow"}
        fontFamily={fontFamily}
      >
        <ScrollGraphic
          className={options.graphic}
          height={graphicProps.height}
          backgroundColor={"pink"}
        >
          <GraphicComponent {...graphicProps} />
          <p>{`You entered Step ${index} by scrolling ${direction}`}</p>
          <p>{`Step ${index} is at ${(progress * 100).toFixed(1)}%`}</p>
        </ScrollGraphic>
        <ScrollText className={options.text} backgroundColor={"blue"}>
          {steps.map((d, i) => {
            const StepComponent = d.component;
            const stepProps = { ...d.props, fontFamily };
            const className =
              i === index ? `is-active ${options.step}` : options.step;
            return (
              <StepComponent className={className} key={i} {...stepProps} />
            );
          })}
        </ScrollText>
      </ScrollContainer>
    );
  }
}

Scrollama.defaultProps = {
  options: {
    container: "scroll__container",
    graphic: "scroll__graphic",
    text: "scroll__text",
    step: "scroll__step",
    offset: 0.5,
    progress: true,
    debug: true
  }
};

/*
  For the complete Scrollama API, see:
  https://github.com/russellgoldenberg/scrollama#api
*/
Scrollama.propTypes = {
  graphic: PropTypes.shape({
    component: PropTypes.func.isRequired,
    props: PropTypes.object
  }),
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.func.isRequired,
      props: PropTypes.object
    })
  ),
  options: PropTypes.shape({
    step: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    graphic: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    offset: PropTypes.number,
    progress: PropTypes.bool,
    debug: PropTypes.bool
  })
};

export { Scrollama };
