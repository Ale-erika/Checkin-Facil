import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useEstados } from "../hooks/useEstados";
import { useCidades } from "../hooks/useCidades";
import { profissoes } from "../data/profissoes";
import { usePaises } from "../hooks/usePaises";

import axios from "axios";

const ReactFormPage = () => {
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { estados } = useEstados();
  const estadosOrdenados = estados.sort((a, b) => a.nome.localeCompare(b.nome));

  const [selectedEstado, setSelectedEstado] = useState("");
  const { cidades } = useCidades({ uf: selectedEstado });

  const handleEstadoUpdate = (event) => {
    setSelectedEstado(event.target.value);
  };

  const [selectedProfissao, setSelectedProfissao] = useState("");
  const handleProfissaoUpdate = (event) => {
    setSelectedProfissao(event.target.value);
  };

  const { paises } = usePaises();
  const [selectedPais, setSelectedPais] = useState("");
  const handlePaisUpdate = (event) => {
    setSelectedPais(event.target.value);
  };

  const listaPaisesA = paises.map((item) => {
    return item.nome.abreviado;
  });

  let listaPaisesB = listaPaisesA.filter((valor, indice, self) => {
    return self.indexOf(valor) === indice;
  });

  listaPaisesB.sort();

  const [message, setMessage] = useState("");

  const handleButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("***handle-submit", data);
    const headers = {
      headers: {
        // indica que será enviado dados em formato objeto
        "Content-Type": "application/json",
      },
    };

    var form = document.querySelector("form");

    await axios
      .post("http://localhost:8080/checkin", data, headers)
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
        form.reset();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  return (
    <div>
      {message ? (
        <p className="text-center text-indigo-700 font-bold">{message}</p>
      ) : (
        ""
      )}
      <form onSubmit={handleButtonClick} className="w-full max-w-lg">
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1" htmlFor="nome">
              Nome Completo
            </label>
            <input
              className="bg-white border-2 p-1 w-96"
              id="nome"
              type="text"
              placeholder="Seu nome"
              required
              {...register("nome", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.nome?.type === "required" && (
              <p className="error-message">Nome é obrigatório.</p>
            )}
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 mt-4" htmlFor="email">
              Email
            </label>
            <input
              className="bg-white border-2 p-1 w-96"
              id="email"
              type="text"
              placeholder="Seu email"
              required
              {...register("email", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.email?.type === "required" && (
              <p className="Error-message">Email é obrigatório.</p>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 mt-4" htmlFor="telefone">
              Telefone
            </label>
            <input
              className="bg-white border-2 p-1 w-44"
              id="telefone"
              type="text"
              placeholder=" "
              maxLength={13}
              minLength={12}
            />
          </div>
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 ml-14 mt-4" htmlFor="celular">
              Celular
            </label>
            <IMaskInput
              className="bg-white border-2 p-1 w-48 ml-14"
              id="celular"
              type="text"
              placeholder=""
              required
              mask="(00)00000-0000"
              {...register("celular", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.celular?.type === "required" && (
              <p className="Error-message">Celular é obrigatório.</p>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 mt-4" htmlFor="profissao">
              Profissão
            </label>
            <select
              className="bg-white border-2 p-1 pointer-events-auto w-44 ml-0"
              id="profissao"
              value={selectedProfissao}
              onChange={handleProfissaoUpdate}
            >
              {profissoes.map((profissao) => (
                <option>{profissao}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 ml-14 mt-4" htmlFor="nacionalidade">
              Nacionalidade
            </label>
            <select
              className="bg-white border-2 p-1 pointer-events-auto w-48 ml-14"
              id="nacionalidade"
              value={selectedPais}
              onChange={handlePaisUpdate}
            >
              {listaPaisesB.map((pais) => (
                <option>{pais}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 w-40 ml-1 mt-4" htmlFor="dtNasc">
              Data de Nascimento
            </label>

            <input
              id="dt-nasc"
              class={errors?.dtnasc && "input-error"}
              type="date"
              placeholder=""
              required
              {...register("dtnasc", { required: true })}
              onChange={handleInputChange}
            />

            {errors?.dtnasc?.type === "required" && (
              <p className="Error-message">Data de nascimento é obrigatório.</p>
            )}
          </div>
          <div className="flex flex-col w-32 ml-3">
            <label className="w-32 ml-14 mt-4" htmlFor="sexo">
              Sexo
            </label>
            <select
              className="bg-white border-2 p-1 pointer-events-auto w-48 ml-14"
              name="sexo"
              id="sexo"
            >
              <option value="">--</option>
              <option value="Feminino">F</option>
              <option value="Masculino">M</option>
            </select>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 mt-4" htmlFor="cpf">
              CPF
            </label>
            <IMaskInput
              className="bg-white border-2 p-1 w-44"
              id="cpf"
              type="text"
              placeholder=" "
              required
              mask="000.000.000-00"
              {...register("cpf", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.cpf?.type === "required" && (
              <p className="Error-message">CPF é obrigatório.</p>
            )}
          </div>
          <div class="flex flex-col flex-1 ml-3">
            <label class="text-sm mb-1 ml-14 mt-4" htmlFor="rg">
              RG
            </label>
            <input
              className="bg-white border-2 p-1 w-48 ml-14"
              id="rg"
              type="text"
              placeholder=""
              required
              {...register("rg", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.rg?.type === "required" && (
              <p className="Error-message">RG é obrigatório.</p>
            )}
          </div>
          <div className="flex flex-col flex-1 ml-0">
            <label
              className="text-sm mb-1 w-36 ml-3 mt-4"
              htmlFor="orgaoexpedidor"
            >
              Órgão expedidor
            </label>
            <input
              className="bg-white border-2 p-1 w-36 ml-2"
              id="orgaoexpedidor"
              type="text"
              placeholder=""
              required
              {...register("orgaoexpedidor", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.orgaoexpedidor?.type === "required" && (
              <p className="Error-message">Órgão expedidor é obrigatório.</p>
            )}
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 mt-4" htmlFor="endereco">
              Endereco
            </label>
            <input
              className="bg-white border-2 p-1 w-96"
              id="endereco"
              type="text"
              placeholder=" "
              required
              {...register("endereco", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.endereco?.type === "required" && (
              <p className="Error-message">Endereço é obrigatório.</p>
            )}
          </div>
          <div className="flex flex-col flex-1 ml-60">
            <label className="text-sm mb-1 ml-7 mt-4" htmlFor="nro">
              Nro
            </label>
            <input
              className="bg-white border-2 p-1 w-36 ml-6"
              id="nro"
              type="text"
              placeholder=""
              required
              {...register("nro", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.nro?.type === "required" && (
              <p className="Error-message">Número é obrigatório.</p>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 mt-4" htmlFor="complemento">
              Complemento
            </label>
            <input
              className="bg-white border-2 p-1 w-96"
              id="complemento"
              type="text"
              placeholder=" "
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col flex-1 ml-60">
            <label className="text-sm mb-1 ml-6 mt-4" htmlFor="bairro">
              Bairro
            </label>
            <input
              className="bg-white border-2 p-1 w-36 ml-6"
              id="bairro"
              type="text"
              placeholder=""
              required
              {...register("bairro", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.bairro?.type === "required" && (
              <p className="Error-message">Bairro é obrigatório.</p>
            )}
          </div>
          <div className="flex flex-col flex-1 ml-2">
            <label className="text-sm mb-1 mt-4" htmlFor="cep">
              CEP
            </label>
            <IMaskInput
              className="bg-white border-2 p-1 w-40 ml-0"
              id="cep"
              type="text"
              placeholder=""
              required
              mask="00.000-000"
              {...register("cep", { required: true })}
              onChange={handleInputChange}
            />
            {/* <input
              className="bg-white border-2 p-1 w-40 ml-0"
              id="cep"
              type="text"
              placeholder=""
              required
              {...register("cep", { required: true })}
              onChange={handleInputChange}
            /> */}
            {errors?.cep?.type === "required" && (
              <p className="Error-message">CEP é obrigatório.</p>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 mt-4" htmlFor="pais">
              País
            </label>
            <input
              className="bg-white border-2 p-1 w-52"
              id="pais"
              type="text"
              placeholder=" "
              required
            />
          </div>
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 ml-20 mt-4" htmlFor="estado">
              Estado
            </label>
            <select
              className="bg-white border-2 p-1 pointer-events-auto w-40 ml-20"
              id="estado"
              value={selectedEstado}
              onChange={handleEstadoUpdate}
            >
              {estadosOrdenados.map((estado) => (
                <option key={estado.id} value={estado.sigla}>
                  {estado.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col flex-1 ml-3">
            <label className="text-sm mb-1 ml-28 mt-4" htmlFor="cidade">
              Cidade
            </label>
            <select
              className="bg-white border-2 p-1 pointer-events-auto w-80 ml-28"
              id="cidade"
            >
              {cidades.map((cidade) => (
                <option key={cidade.codigo_ibge}>{cidade.nome}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 mt-4" htmlFor="procedencia">
              Última Procedência
            </label>
            <input
              className="bg-white border-2 p-1 w-96"
              id="procedencia"
              type="text"
              placeholder=" "
              required
              onChange={handleInputChange}
              {...register("procedencia", { required: true })}
            />
            {errors?.destino?.type === "required" && (
              <p className="Error-message">Procedência é obrigatória.</p>
            )}
          </div>
          <div className="flex flex-col flex-1 ml-60">
            <label className="text-sm mb-1 ml-6 mt-4" htmlFor="destino">
              Próximo Destino
            </label>
            <input
              className="bg-white border-2 p-1 w-96 ml-6"
              id="destino"
              type="text"
              placeholder=""
              required
              {...register("destino", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.destino?.type === "required" && (
              <p className="Error-message">Destino é obrigatório.</p>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 mt-4" htmlFor="mtviagem">
              Motivo da Viagem
            </label>
            <select
              className="bg-white border-2 p-1 pointer-events-auto w-96 ml-0"
              name="mtviagem"
              id="mtviagem"
            >
              <option value="">--</option>
              <option value="Lazer">Lazer</option>
              <option value="Negócios">Negócios</option>
            </select>
          </div>
          <div className="flex flex-col flex-1 ml-60">
            <label className="text-sm mb-1 ml-6 mt-4" htmlFor="transporte">
              Meio de Transporte
            </label>
            <input
              className="bg-white border-2 p-1 w-96 ml-6"
              id="transporte"
              type="text"
              placeholder=""
              required
              {...register("transporte", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.transporte?.type === "required" && (
              <p className="Error-message">Meio de Transporte é obrigatório.</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="botao submit bg-indigo-200 border-2 rounded px-3 py-1 ml-3 mt-4"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ReactFormPage;
