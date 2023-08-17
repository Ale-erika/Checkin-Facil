import { useForm } from "react-hook-form";

export default function TelInput({
  labelDescription = "Descrição do label:",
  inputValue = " ",
  onInputChange = null,
  id = "id_do_input_tel",
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

        <input
          autoFocus={autoFocus}
          id={id}
          className="bg-white border-2 p-1"
          type="text"
          value={inputValue}
          placeholder=" "
          maxLength={13}
          minLength={12}
          {...register("id", { required: true })}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
