import React from "react";
import {
  render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getByTestId,
  getAllByTestId, getByAltText, getByPlaceholderText, queryByText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />); // getByText inside <Application />

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });


  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];                            //after await!

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer")); //altText is alt=props.name in <img>
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    await waitForElement(() => getByAltText(appointment, "Delete"));
    // expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument(); //check again to see if saved
    // expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    // expect(getAllByTestId(container, "day")[0]).toHaveTextContent("no spots remaining");
    //being mapped -> rendered as array, so use [index]!!
  });


});
