import validateInput from "./validateInput";

const handleBlur = (
    field: string,
    value: string,
    isRequired: boolean = false,
    setFormError:Function
  ) => {
    const error = validateInput(value, isRequired);
    setFormError((prevErrors:{
        username: string | null ,
        name: string | null  ,
        avatarUrl: string | null  ,
        message: string | null  
      })  => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  export default handleBlur