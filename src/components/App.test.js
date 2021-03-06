import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import "../setupEnzymeTests";
import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("should call componentDidMount once (spy)", () => {
    const componentDidMountSpy = jest.spyOn(App.prototype, "componentDidMount");
    const wrapper = shallow(<App />);
    expect(App.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    componentDidMountSpy.mockClear();
  });
});
