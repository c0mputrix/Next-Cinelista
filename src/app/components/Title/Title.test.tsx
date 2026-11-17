import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import Title from './index';

test ("renderiza o título corretamente", async () => {
  
    const titulo = "Título";

    render(<Title title={titulo} />);

    const elemento = await screen.findByText(titulo);

    expect(elemento).toBeInTheDocument();
});