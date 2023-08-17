import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useEstados } from "../hooks/useEstados";
import { useCidades } from "../hooks/useCidades";
import TextInput from "../components/TextInput";
import TelInput from "../components/TelInput";
import CelInput from "../components/CelInput";

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form className="w-full max-w-lg">
        <div className="md:w-3/4 mb-1">
          <label className="text-sm mb-1" htmlFor="nome">
            Nome Completo
          </label>
        </div>
        <div className="md:w-2/3 mb-1">
          <input
            className="bg-white border-2 p-1"
            id="nome"
            type="text"
            placeholder="Seu nome"
            {...register("nome", { required: true })}
            onChange={handleInputChange}
          />
          {errors?.nome?.type === "required" && (
            <p className="Error-message">Nome é obrigatório.</p>
          )}
        </div>

        <div className="md:w-1/3 mb-1 inline-flex">
          <label className="text-sm mb-1" htmlFor="email">
            Email
          </label>
        </div>
        <div className="md:w-2/3 mb-1 inline-flex">
          <input
            className="bg-white border-2 p-1"
            id="inline-full-email"
            type="text"
            placeholder="Seu email"
            {...register("email", { required: true })}
            onChange={handleInputChange}
          />
          {errors?.email?.type === "required" && (
            <p className="Error-message">Email é obrigatório.</p>
          )}
        </div>
        <div className="flex -mx-3 mb-1">
          <div className="w-full md:w-1/2 px-3">
            <label className="text-sm mb-1" htmlFor="telefone">
              Telefone
            </label>
            <input
              className="bg-white border-2 p-1"
              id="grid-telefone"
              type="text"
              placeholder=" "
              maxLength={13}
              minLength={12}
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="text-sm mb-1" htmlFor="celular">
              Celular
            </label>
            <IMaskInput
              className="bg-white border-2 p-1"
              id="grid-celular"
              type="text"
              placeholder=""
              mask="(00)00000-0000"
              {...register("celular", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.celular?.type === "required" && (
              <p className="Error-message">Celular é obrigatório.</p>
            )}
          </div>
        </div>
        <div className="md:w-1/3 mb-1">
          <label className="text-sm mb-1" htmlFor="dtNasc">
            Data de Nascimento
          </label>
        </div>
        <div className="md:w-2/3 mb-1">
          <input
            className="bg-white border-2 p-1"
            id="inline-dt-nasc"
            type="date"
            placeholder=""
          />
        </div>
        <div className="md:w-1/3 mb-1">
          <label className="text-sm mb-1" htmlFor="dtNasc">
            Profissão
          </label>
        </div>
        <div className="md:w-2/3 mb-1">
          <input
            className="bg-white border-2 p-1"
            id="inline-profissao"
            type="text"
            placeholder="Sua profissão"
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="md:w-1/3">
            <label className="text-sm mb-1" htmlFor="pais">
              País
            </label>
            <input
              className="bg-white border-2 p-1"
              id="grid-pais"
              type="text"
              placeholder=" "
            />
          </div>
          <label className="text-sm mb-1" htmlFor="estado">
            Estado
          </label>
          <div className="flex flex-wrap -mx-3 mb-2 my-9">
            <select
              className="bg-white border-2 p-1 pointer-events-auto"
              //       className="bg-white appearance-none border-2 border-gray-200 rounded block w-full py-2 px-4 text-gray-700 w-full py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="grid-estado"
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
          <label className="text-sm mb-1" htmlFor="cidade">
            Cidade
          </label>
          <div className="flex flex-wrap -mx-3 mb-1 my-9">
            <select
              className="bg-white border-2 p-1 pointer-events-auto"
              id="grid-cidade"
            >
              {cidades.map((cidade) => (
                <option key={cidade.codigo_ibge}>{cidade.nome}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="md:w-1/3">
            <label className="text-sm mb-1" htmlFor="cpf">
              CPF
            </label>
            <IMaskInput
              className="bg-white border-2 p-1"
              id="grid-cpf"
              type="text"
              placeholder=" "
              mask="000.000.000-00"
              {...register("rg", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.cpf?.type === "required" && (
              <p className="Error-message">CPF é obrigatório.</p>
            )}
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="text-sm mb-1" htmlFor="rg">
              RG
            </label>
            <input
              className="bg-white border-2 p-1"
              id="grid-rg"
              type="text"
              placeholder=""
              {...register("rg", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.rg?.type === "required" && (
              <p className="Error-message">RG é obrigatório.</p>
            )}
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label className="text-sm mb-1" htmlFor="orgaoexpedidor">
              Órgão expedidor
            </label>
            <input
              className="bg-white border-2 p-1"
              id="grid-orgaoexpedidor"
              type="text"
              placeholder=""
              {...register("orgaoexpedidor", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.orgaoexpedidor?.type === "required" && (
              <p className="Error-message">Órgão expedidor é obrigatório.</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReactFormPage;
