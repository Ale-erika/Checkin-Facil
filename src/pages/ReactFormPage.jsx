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
              {...register("nome", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.nome?.type === "required" && (
              <p className="Error-message">Nome é obrigatório.</p>
            )}
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="bg-white border-2 p-1 w-96"
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
        </div>
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1" htmlFor="telefone">
              Telefone
            </label>
            <input
              className="bg-white border-2 p-1 w-30"
              id="grid-telefone"
              type="text"
              placeholder=" "
              maxLength={13}
              minLength={12}
            />
          </div>
          <div class="flex flex-col w-32 ml-3">
            <label class="text-sm mb-1 ml-1" htmlFor="celular">
              Celular
            </label>
            <IMaskInput
              className="bg-white border-2 p-1 w-36 ml-1"
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
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label for="sexo">Sexo</label>
            <select
              className="bg-white border-2 p-1 pointer-events-auto w-30"
              name="sexo"
              id="sexo"
            >
              <option value="">--</option>
              <option value="Feminino">F</option>
              <option value="Masculino">M</option>
            </select>
          </div>
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1 w-40 ml-1" htmlFor="dtNasc">
              Data de Nascimento
            </label>

            <input
              className="bg-white border-2 p-1 w-36 ml-1"
              id="inline-dt-nasc"
              type="date"
              placeholder=""
            />
          </div>

          <div className="flex flex-col w-32 ml-9">
            <label className="text-sm mb-1 ml-0" htmlFor="profissao">
              Profissão
            </label>
            <input
              className="bg-white border-2 p-1 w-44 ml-0"
              id="inline-profissao"
              type="text"
              placeholder="Sua profissão"
            />
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
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
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1" htmlFor="estado">
              Estado
            </label>
            <select
              className="bg-white border-2 p-1 pointer-events-auto w-36"
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
          <div className="flex flex-col flex-1 ml-3">
            <label className="text-sm mb-1 ml-6" htmlFor="cidade">
              Cidade
            </label>
            <select
              className="bg-white border-2 p-1 pointer-events-auto w-44 ml-6"
              id="grid-cidade"
            >
              {cidades.map((cidade) => (
                <option key={cidade.codigo_ibge}>{cidade.nome}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1" htmlFor="cpf">
              CPF
            </label>
            <IMaskInput
              className="bg-white border-2 p-1"
              id="grid-cpf"
              type="text"
              placeholder=" "
              mask="000.000.000-00"
              {...register("cpf", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.cpf?.type === "required" && (
              <p className="Error-message">CPF é obrigatório.</p>
            )}
          </div>
          <div class="flex flex-col flex-1 ml-3">
            <label class="text-sm mb-1" htmlFor="rg">
              RG
            </label>
            <input
              className="bg-white border-2 p-1 w-36"
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
          <div class="flex flex-col flex-1 ml-3">
            <label class="text-sm mb-1 ml-1" htmlFor="orgaoexpedidor">
              Órgão expedidor
            </label>
            <input
              className="bg-white border-2 p-1 w-44 ml-1"
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
        <div className="flex">
          <div className="flex flex-col w-32 ml-3">
            <label className="text-sm mb-1" htmlFor="endereco">
              Endereco
            </label>
            <input
              className="bg-white border-2 p-1 w-96"
              id="grid-endereco"
              type="text"
              placeholder=" "
              {...register("endereco", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.endereco?.type === "required" && (
              <p className="Error-message">Endereço é obrigatório.</p>
            )}
          </div>
          <div class="flex flex-col flex-1 ml-72">
            <label class="text-sm mb-1" htmlFor="nro">
              Nro
            </label>
            <input
              className="bg-white border-2 p-1 w-20"
              id="grid-nro"
              type="text"
              placeholder=""
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
            <label className="text-sm mb-1" htmlFor="complemento">
              Complemento
            </label>
            <input
              className="bg-white border-2 p-1 w-96"
              id="grid-complemento"
              type="text"
              placeholder=" "
              onChange={handleInputChange}
            />
          </div>
          <div class="flex flex-col flex-1 ml-72">
            <label class="text-sm mb-1" htmlFor="bairro">
              Bairro
            </label>
            <input
              className="bg-white border-2 p-1 w-40 ml-0"
              id="grid-bairro"
              type="text"
              placeholder=""
              {...register("bairro", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.bairro?.type === "required" && (
              <p className="Error-message">Bairro é obrigatório.</p>
            )}
          </div>
          <div class="flex flex-col flex-1 ml-3">
            <label class="text-sm mb-1" htmlFor="cep">
              CEP
            </label>
            <input
              className="bg-white border-2 p-1 w-40 ml-0"
              id="grid-cep"
              type="text"
              placeholder=""
              {...register("cep", { required: true })}
              onChange={handleInputChange}
            />
            {errors?.cep?.type === "required" && (
              <p className="Error-message">CEP é obrigatório.</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReactFormPage;
