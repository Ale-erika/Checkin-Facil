import { useState, useEffect } from "react";

export interface Regiao {
  id: Number;
  sigla: String;
  nome: string;
}

export interface IEstado {
  id: Number;
  sigla: String;
  nome: string;
  regiao: Regiao;
}

export const useEstados = () => {
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    fetch("https://brasilapi.com.br/api/ibge/uf/v1")
      .then((resp) => resp.json())
      .then(setEstados);
  }, []);

  return {
    estados,
  };
};
