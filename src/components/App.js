import React, { Component } from "react";
import { Intro, ScreenA, ScreenB, Outro } from "./Screens";

class App extends Component {
  state = {
    stories: []
  };

  render() {
    const { stories } = this.state;
    return (
      <div className="App">
        <Intro fontFamily={"Lobster"} />
        <div>TODO: scrollama component here</div>
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
