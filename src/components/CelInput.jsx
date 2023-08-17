import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";

export default function CelInput({
  labelDescription = "Descrição do label:",
  inputValue = " ",
  onInputChange = null,
  id = "id_do_input_cel",
  autoFocus = false,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newValue = currentTarget.value;
      onInputChange(newValue);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div class="md: w-3/4 mb-1  inline-flex">
      <div className="flex flex-row my-4">
        <label className="text-sm mb-1" htmlFor={id}>
          {labelDescription}
        </label>

        <IMaskInput
          autoFocus={autoFocus}
          id={id}
          className="bg-white border-2 p-1"
          type="text"
          value={inputValue}
          mask="(00)00000-0000"
          {...register("id", { required: true })}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
