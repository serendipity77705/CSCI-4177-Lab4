import { render, screen } from "@testing-library/react";
import NavBar from "../components/NavBar";
import '@testing-library/jest-dom'

describe("NavBar", () => {
    it("renders the Nav bar", () => {
        render(
            <NavBar />
        );
        expect(screen.getByText("TenantTrails")).toBeInTheDocument();
    });
});