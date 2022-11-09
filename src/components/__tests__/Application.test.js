import React from "react";
import {
  render, cleanup, waitForElement, fireEvent, getByText, prettyDOM,
  getAllByTestId, getByAltText, getByPlaceholderText, queryByText,
  queryByAltText
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
  ///////////////////////////////////////////////////////////////////////

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

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
  });
  ///////////////////////////////////////////////////////////////////////

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown

    expect(getByText(appointment, "Are you sure you'd like to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation
    fireEvent.click(getByText(appointment, "Confirm"));

    // // 6. Check that the element with the text "Deleting" is displayed
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // // 7. Wait until the element with the "Add" button is displayed
    await waitForElement(() => getByAltText(appointment, "Add"));

    //  // 8. Check that the DayListItem with text "Monday" also has text "2 spots remaining"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  ///////////////////////////////////////////////////////////////////////

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Render application
    const { container } = render(<Application />);

    //Wait until text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //Click Edit button on booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    //Change student name input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //Click Save button on edit form
    fireEvent.click(getByText(appointment, "Save"));

    //Check text with Saving is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //Wait until Show form displays
    await waitForElement(() => getByAltText(appointment, "Edit"));

    //Check to see if updated name displays
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    //Check that DayListItem has same spots remaining
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});
