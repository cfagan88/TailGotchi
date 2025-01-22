const validateInput = (value: string, isRequired: boolean = false) => {
    const inputRegex = /^[\p{L}\p{M}'-.!]+(?: [\p{L}\p{M}'-.!]+)*$/u;
    if (isRequired && value.trim() === "") {
      return "This field is required.";
    } else if (value.trim() !== "" && !inputRegex.test(value)) {
      return "Please use only letters, spaces, and standard punctuation.";
    }
    return null;
  };

  export default validateInput