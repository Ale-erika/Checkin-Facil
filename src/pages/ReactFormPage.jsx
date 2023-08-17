import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useEstados } from "../hooks/useEstados";
import { useCidades } from "../hooks/useCidades";

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
        <div class="md: w-3/4 mb-1  inline-flex">
          <div className="md:w-3/4 mb-1">
            <label
              className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 flex-row"
              for="inline-full-name"
            >
              Nome Completo
            </label>
          </div>
          <div className="md:w-2/3 mb-1">
            <input
              className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="Seu nome"
              {...register("name", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.name?.type === "required" && (
              <p className="Error-message">Nome é obrigatório.</p>
            )}
          </div>
        </div>

        <div className="md:w-1/3 mb-1">
          <label
            className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-email"
          >
            Email
          </label>
        </div>
        <div className="md:w-2/3 mb-1">
          <input
            className="g-white  appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="md:w-1/3">
            <label
              className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 pl-3"
              for="grid-telefone"
            >
              Telefone
            </label>
            <input
              className="bg-white  appearance-none border-2 border-gray-200 rounded block w-full py-2 px-4 text-gray-700 w-full py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="grid-telefone"
              type="text"
              placeholder=" "
              maxLength={13}
              minLength={12}
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-7"
              for="grid-celular"
            >
              Celular
            </label>
            <IMaskInput
              className="bg-white  appearance-none border-2 border-gray-200 rounded block w-full py-2 px-4 text-gray-700 w-full py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
          <label
            className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-dt-nasc"
          >
            Data de Nascimento
          </label>
        </div>
        <div className="md:w-2/3 mb-1">
          <input
            className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-dt-nasc"
            type="date"
            placeholder=""
          />
        </div>
        <div className="md:w-1/3 mb-1">
          <label
            className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-profissao"
          >
            Profissão
          </label>
        </div>
        <div className="md:w-2/3 mb-1">
          <input
            className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-profissao"
            type="text"
            placeholder="Sua profissão"
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="md:w-1/3">
            <label
              className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 pl-3"
              for="grid-pais"
            >
              País
            </label>
            <input
              className="bg-white appearance-none border-2 border-gray-200 rounded block w-full py-2 px-4 text-gray-700 w-full py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="grid-pais"
              type="text"
              placeholder=" "
            />
          </div>
          <label
            className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 pl-10"
            for="grid-estado"
          >
            Estado
          </label>
          <div className="flex flex-wrap -mx-3 mb-1 my-6">
            <select
              className="bg-white appearance-none border-2 border-gray-200 rounded block w-full py-2 px-4 text-gray-700 w-full py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <label
            className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 pl-10"
            for="grid-cidade"
          >
            Cidade
          </label>
          <div className="flex flex-wrap -mx-3 mb-1 my-6">
            <select
              className="bg-white appearance-none border-2 border-gray-200 rounded block w-full py-2 px-4 text-gray-700 w-full py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="grid-cidade"
            >
              {cidades.map((cidade) => (
                <option key={cidade.codigo_ibge}>{cidade.nome}</option>
              ))}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="md:w-1/3">
            <label
              className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 pl-3"
              for="grid-cpf"
            >
              CPF
            </label>
            <IMaskInput
              className="bg-white  appearance-none border-2 border-gray-200 rounded block w-full py-2 px-4 text-gray-700 w-full py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
            <label
              class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-7"
              for="grid-rg"
            >
              RG
            </label>
            <input
              className="bg-white  appearance-none border-2 border-gray-200 rounded block w-full py-2 px-4 text-gray-700 w-full py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
            <label
              class="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-7"
              for="grid-orgaoexpedidor"
            >
              Órgão expedidor
            </label>
            <input
              className="bg-white  appearance-none border-2 border-gray-200 rounded block w-full py-2 px-4 text-gray-700 w-full py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
