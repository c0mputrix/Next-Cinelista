import { renderHook } from "@testing-library/react";
import { useResumoFilme } from "./useResumoFilme";


test("Retorna overview inteiro se menor queo limite", () => {
    const texto = "Resumo curto";
    const {result} = renderHook(() => useResumoFilme(texto, 256));
    expect(result.current).toBe(texto);
});

test("Retorna overview resumido se maior que o limite", () => {
    const texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const {result} = renderHook(() => useResumoFilme(texto, 10));
    expect(result.current).toBe("Lorem ipsu...");
});