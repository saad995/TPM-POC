const TextValidator = (data: any = {}) => {
  const { regex, value } = data;
  let isValid = false;
  if (regex && value) {
    isValid = regex.test(value);
  }
  return isValid;
};


export default TextValidator;