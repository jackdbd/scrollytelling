import React, { Component } from "react";
import { PropagateLoader } from "react-spinners";
import { scaleLinear, scaleBand } from "d3-scale";
// import { Scrollama } from "./Scrollama";
import { Intro, ScreenA, ScreenB, Outro } from "./Screens";
// import { StepA, StepB } from "./Steps";
import { BarChart, ResponsiveBarChart } from "./Graphics";

const barData = [{ x: 10, y: "A" }, { x: 20, y: "B" }, { x: 50, y: "C" }];
const barScales = {
  x: scaleLinear().domain([0, 100]),
  y: scaleBand().domain(["A", "B", "C"])
};

class App extends Component {
  state = {
    stories: []
  };

  render() {
    const { stories } = this.state;
    // we need a scrollama instance for each story (i.e. a scrollable section)
    const scrollamaOptionsList = stories.map((d, i) => {
      const opt = {
        container: `scroll__container_${i}`,
        graphic: `scroll__graphic_${i}`,
        text: `scroll__text_${i}`,
        step: `scroll__step_${i}`,
        offset: 0.5 + (i + 1) * 0.1,
        progress: true,
        debug: true
      };
      return opt;
    });
    return (
      <div className="App">
        <Intro fontFamily={"Lobster"} />
        <BarChart data={barData} scales={barScales} />
        <ResponsiveBarChart data={barData} scales={barScales} showDebug />
        {stories.length > 0 ? (
          <div>TODO: scrollama component here</div>
        ) : (
          <PropagateLoader
            color={"#0336ff"}
            loading={true}
            loaderStyle={{ left: "50%", top: "40%" }}
          />
        )}
        <ScreenA fontFamily={"Kalam"} backgroundColor={"red"} />
        <div>TODO: scrollama component here</div>
        <ScreenB backgroundColor={"blue"} />
        <div>TODO: scrollama component here</div>
        <Outro />
      </div>
    );
  }
}

export default App;
