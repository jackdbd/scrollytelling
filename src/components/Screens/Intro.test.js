import React from "react";
import { shallow, mount, render } from "enzyme";
import "../../setupEnzymeTests";
import Intro from "./Intro";

describe("<Intro />", () => {
  it("has two <p> elements", () => {
    const wrapper = mount(<Intro />);
    expect(wrapper.find("p")).toHaveLength(2);
  });
  it("contains 'Scroll to start'", () => {
    const wrapper = mount(<Intro />);
    expect(
      wrapper
        .find("p")
        .at(1)
        .text()
    ).toContain("Scroll to start");
  });
  it("matches the snapshot", () => {
    expect(<Intro />).toMatchSnapshot();
  });
});
