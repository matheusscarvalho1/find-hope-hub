import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import InternalServerError from "../internal-server-error";

vi.mock("../../../components/common/Header.tsx", () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock("../../../components/common/Footer.tsx", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

describe("Internal Server Error Page", () => {
  it("deve renderizar o Header e Footer", () => {
    render(<InternalServerError />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("deve exibir o código de erro 500", () => {
    render(<InternalServerError />);
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("deve exibir a mensagem de erro interno no servidor", () => {
    render(<InternalServerError />);
    expect(
      screen.getByText(
        "Ocorreu um erro interno no servidor, tente novamente mais tarde.",
      ),
    ).toBeInTheDocument();
  });

  it("deve ter um link para voltar à Home", () => {
    render(<InternalServerError />);
    const link = screen.getByRole("link", { name: /Voltar para a Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
