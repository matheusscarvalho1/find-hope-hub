import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import NotFound from "../not-found-error";

vi.mock("../../../components/common/Header.tsx", () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock("../../../components/common/Footer.tsx", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

describe("Not Found Page", () => {
  it("deve renderizar o Header e Footer", () => {
    render(<NotFound />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("deve exibir o código de erro 404", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("deve exibir a mensagem de página não encontrada", () => {
    render(<NotFound />);
    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
  });

  it("deve ter um link para voltar à Home", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: /Voltar para a Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
