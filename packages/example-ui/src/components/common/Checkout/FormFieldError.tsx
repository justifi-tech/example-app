export enum FormFieldErrorTypes {
  required = "required",
  invalid = "invalid",
}

function FormFieldError(props: {
  label: string;
  errorType: FormFieldErrorTypes;
}) {
  const messages = {
    required: `${props.label} is required.`,
    invalid: `${props.label} is invalid.`,
  };

  return (
    <div className={"form-field-error-message"}>
      {messages[props.errorType]}
    </div>
  );
}

export default FormFieldError;
