import { useCallback, useState } from "react";

// Generic form hook using native constraint validation API
export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: e.target.validationMessage }));
    // form validity via closest form
    const form = e.target.closest("form");
    if (form) setIsValid(form.checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, []);

  return { values, setValues, errors, setErrors, isValid, setIsValid, handleChange, resetForm };
}
