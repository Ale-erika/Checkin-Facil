import { useState, useEffect } from "react";

export const usePaises = () => {
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    fetch(`https://servicodados.ibge.gov.br/api/v1/paises/{paises}`)
      .then((resp) => resp.json())
      .then(setPaises);
  }, []);

  return {
    paises,
  };
};
