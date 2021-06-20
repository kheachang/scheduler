/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import {
  render,
  waitForElement,
  fireEvent,
  getByText,
} from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "../Application";

// afterEach(cleanup);

/*
  A test that renders a React Component
*/
afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is slected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));

    const day = getByText("Tuesday");

    fireEvent.click(day);

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render components and wait for data to be fetched
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    // Simulate booking a new interview
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    // Check that the interview was added to the DOM
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // Render components and wait for data to be fetched

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // Simulate canceling a new interview
    fireEvent.click(getByAltText(appointment, "Delete"));

    // Check that the confirmation mode shows
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    // Check that the deleting status is shown
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    // Check that the interview was canceled
    await waitForElement(() => getByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining"));
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Render components and wait for data to be fetched and added

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // simulate editting an interview

    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    // Check that the saving status is shown
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    // Check that the spots remaining is unchanged
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // Render components and wait for data to be fetched and added
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    // Simulate booking a new interview
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    // Check that SAVING mode shows
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    // Check that Error mode is shown on failed put request
    await waitForElement(() => queryByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));

    // Check that mode defaulted back to EMPTY
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();
  });

  it("shows the delete error when failing to dele an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // Render components and wait for data to be fetched and added
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // Simulate canceling a new interview
    fireEvent.click(getByAltText(appointment, "Delete"));

    // Check that the confirmation mode shows
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    // Check that the deleting status is shown and check for Error mode
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();

    // Close error mode
    fireEvent.click(getByAltText(appointment, "Close"));

    // Check that application went back to original state
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining"));
  });
});
