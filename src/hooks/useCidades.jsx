import { useState, useEffect } from "react";

export interface ICidade {
  nome: string;
  codigo_ibge: string;
}

export const useCidades = ({ uf }) => {
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    if (!uf) return;
    fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`)
      .then((resp) => resp.json())
      .then(setCidades);
  }, [uf]);
  return {
    cidades,
  };
};
