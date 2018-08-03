import React from "react";
import { shallow, mount, render } from "enzyme";
import "../setupEnzymeTests";
import Container from "./Container";

describe("<Container />", () => {
  it("renders one <div>", () => {
    const wrapper = mount(<Container />);
    expect(wrapper.find("div")).toHaveLength(1);
  });
  it("matches the snapshot", () => {
    expect(<Container />).toMatchSnapshot();
  });
});
