import React, { Component } from "react";
import { PropagateLoader } from "react-spinners";
import { scaleLinear, scaleBand } from "d3-scale";
import { Scrollama } from "./Scrollama";
import { Intro, ScreenA, ScreenB, Outro } from "./Screens";
import { StepA, StepB } from "./Steps";
import { ResponsiveBarChart } from "./Graphics";

class App extends Component {
  state = {
    stories: []
  };

  componentDidMount() {
    const firstStory = {
      steps: [
        {
          component: StepA,
          props: { title: "Step Title 1" }
        },
        {
          component: StepB,
          props: { title: "Step Title 2" }
        },
        {
          component: StepA,
          props: {
            title: "Step Title 3"
          }
        }
      ],
      graphic: {
        component: ResponsiveBarChart,
        props: {
          data: [
            [{ x: 10, y: "A" }, { x: 25, y: "B" }, { x: 50, y: "C" }],
            [{ x: 50, y: "A" }, { x: 40, y: "B" }, { x: 10, y: "C" }],
            [{ x: 90, y: "A" }, { x: 10, y: "B" }, { x: 100, y: "C" }]
          ],
          scales: {
            x: scaleLinear().domain([0, 100]),
            y: scaleBand().domain(["A", "B", "C"])
          }
        }
      }
    };
    const secondStory = {
      steps: [
        {
          component: StepA,
          props: { title: "Step1" }
        },
        {
          component: StepA,
          props: { title: "Step2" }
        },
        {
          component: StepB,
          props: { title: "Step3" }
        },
        {
          component: StepB,
          props: { title: "Step4" }
        }
      ],
      graphic: {
        component: ResponsiveBarChart,
        props: {
          margin: {
            top: 20,
            right: 30,
            bottom: 40,
            left: 60
          },
          xLabel: "Price",
          showDebug: true,
          data: [
            [{ price: 1, food: "Milk" }, { price: 1.3, y: "Bread" }],
            [{ price: 1.5, food: "Milk" }, { price: 1.2, y: "Bread" }],
            [{ price: 2, food: "Milk" }, { price: 1.0, y: "Bread" }],
            [{ price: 1.7, food: "Milk" }, { price: 0.95, y: "Bread" }]
          ],
          scales: {
            x: scaleLinear().domain([0, 2]),
            y: scaleBand().domain(["Milk", "Bread"])
          },
          accessors: {
            x: d => d.price,
            y: d => d.food
          }
        }
      }
    };
    this.setState({ stories: [firstStory, secondStory] });
  }

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
        progress: false,
        debug: true
      };
      return opt;
    });
    return (
      <div className="App">
        <Intro fontFamily={"Lobster"} />
        {stories.length > 0 ? (
          <Scrollama
            options={scrollamaOptionsList[0]}
            steps={stories[0].steps}
            graphic={stories[0].graphic}
            fontFamily={"Kalam"}
          />
        ) : (
          <PropagateLoader
            color={"#0336ff"}
            loading={true}
            loaderStyle={{ left: "50%", top: "40%" }}
          />
        )}
        <ScreenA fontFamily={"Lobster"} backgroundColor={"red"} />
        {stories.length > 1 ? (
          <Scrollama
            options={scrollamaOptionsList[1]}
            steps={stories[1].steps}
            graphic={stories[1].graphic}
            fontFamily={"Lobster"}
          />
        ) : (
          <PropagateLoader
            color={"#0336ff"}
            loading={true}
            loaderStyle={{ left: "50%", top: "40%" }}
          />
        )}
        <ScreenB backgroundColor={"blue"} />
        <Outro />
      </div>
    );
  }
}

export default App;
