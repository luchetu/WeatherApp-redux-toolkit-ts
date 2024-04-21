import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Search from "./Search";

describe("Search component", () => {
    test("renders correctly", () => {
        const onSubmit = jest.fn();
        const setCity = jest.fn();
        render(<Search onSubmit={onSubmit} city="Nairobi" setCity={setCity} />);

        const inputElement = screen.getByPlaceholderText("Enter a city") as HTMLInputElement;
        const buttonElement = screen.getByText("Search");

        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });



    test("calls onSubmit function on form submission", () => {
        const onSubmit = jest.fn();
        const setCity = jest.fn();
        render(<Search onSubmit={onSubmit} city="Nairobi" setCity={setCity} />);

        const buttonElement = screen.getByText("Search");
        fireEvent.click(buttonElement);

        expect(onSubmit).toHaveBeenCalledTimes(1);
    });
});
