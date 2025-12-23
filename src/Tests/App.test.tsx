import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Suspense } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";

import Loading from "../components/common/Loading";
import { api } from "../lib/api";
import DialogDetailsCard from "../pages/Details/components/DialogDetailsCard";
import Details from "../pages/Details/Details";
import NotFound from "../pages/Error/not-found-error";
import Home from "../pages/Home/Home";

vi.mock("../components/common/Header.tsx", () => ({
  default: () => <header>Header</header>,
}));

vi.mock("../components/common/Footer.tsx", () => ({
  default: () => <footer>Footer</footer>,
}));

describe("Testes da aplicação no geral", () => {
  it("deve renderizar a página NotFound dentro do Router", async () => {
    render(
      <MemoryRouter initialEntries={["/rota-inexistente"]}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MemoryRouter>,
    );

    const header = await screen.findByRole("banner"); // header
    const footer = await screen.findByRole("contentinfo"); // footer
    const code404 = await screen.findByText("404");
    const msg = await screen.findByText("Página não encontrada");
    const link = await screen.findByRole("link", {
      name: /Voltar para a Home/i,
    });

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(code404).toBeInTheDocument();
    expect(msg).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("deve renderizar o componente 'Board' em 'Home' utilizando os dados após carregar a API", async () => {
    const apiGetMock = vi.spyOn(api, "get");
    apiGetMock.mockResolvedValueOnce({
      data: {
        content: [
          { id: 1, nome: "João Silva", sexo: "MASCULINO" },
          { id: 2, nome: "Maria Souza", sexo: "FEMININO" },
        ],
        totalPages: 1,
        number: 0,
        totalElements: 2,
      },
    });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </MemoryRouter>,
    );

    const header = await screen.findByRole("banner"); // header
    const footer = await screen.findByRole("contentinfo"); // footer
    const homeContent = await screen.findByRole("heading", {
      name: /Pessoas desaparecidas/i,
    });
    const personFromAPI1 = await screen.findByText("João Silva");
    const personFromAPI2 = await screen.findByText("Maria Souza");

    expect(header).toBeInTheDocument();
    expect(homeContent).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(personFromAPI1).toBeInTheDocument();
    expect(personFromAPI2).toBeInTheDocument();
  });

  it("deve renderizar o componente 'DetailsCard' em 'Details' utilizando os dados após carregar a API", async () => {
    // Mock do fetch '/pessoas/:id'
    const apiGetMock = vi.spyOn(api, "get");
    apiGetMock
      .mockResolvedValueOnce({
        data: {
          id: 1,
          nome: "João Silva",
          ultimaOcorrencia: { ocoId: 1 },
        },
      })
      .mockResolvedValueOnce({
        data: [
          {
            id: 1,
            data: "2025-09-01",
            informacao: "Última localização conhecida",
            anexos: [],
          },
        ],
      });

    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>,
    );

    const detailsCard = await screen.findByTestId("details-card");
    expect(detailsCard).toHaveTextContent("João Silva");
    expect(detailsCard).toHaveTextContent("Última localização conhecida");
  });

  it("Deve enviar os dados com método POST para criar dados sobre mais informações dentro do componente 'DetailsCard' através do Dialog aberto ao adicionar mais informações", async () => {
    const apiPostMock = vi.spyOn(api, "post").mockResolvedValue({
      data: { id: 1, informacao: "teste" },
    });

    const onOpenChangeMock = vi.fn();
    const onSaveSuccessMock = vi.fn();

    render(
      <DialogDetailsCard
        isOpen={true}
        onOpenChange={onOpenChangeMock}
        ocoId={123}
        onSaveSuccess={onSaveSuccessMock}
      />,
    );

    const informacaoInput = screen.getByTestId("info-input");
    await userEvent.type(informacaoInput, "Informação de teste");

    const calendarButton = screen.getByTestId("data-input");
    await userEvent.click(calendarButton);

    const dayButton = screen.getAllByRole("button", { name: /1/ })[0];
    await userEvent.click(dayButton);

    const fileInput = screen.getByTestId("files-input");
    const file = new File(["conteúdo de teste"], "teste.pdf", {
      type: "application/pdf",
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const salvarButton = screen.getByRole("button", { name: /salvar/i });
    await userEvent.click(salvarButton);

    await waitFor(() => expect(apiPostMock).toHaveBeenCalled());

    expect(apiPostMock.mock.calls[0][0]).toContain(
      "/ocorrencias/informacoes-desaparecido",
    );

    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
    expect(onSaveSuccessMock).toHaveBeenCalledWith({
      id: 1,
      informacao: "teste",
    });
  });
});
