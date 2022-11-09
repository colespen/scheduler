import React from "react";

import { getByAltText, render } from "@testing-library/react";

import Appointment from 'components/Appointment/index'

describe("Appointment", () => {
  it("renders without crashing", () => {
    const { container } = render(<Appointment />);
    expect(getByAltText(container, "Add"));
  });
}); 