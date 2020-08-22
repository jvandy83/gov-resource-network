import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors, callback, isSubmitting, values]);

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    !!e && e.preventDefault();
    setIsSubmitting(true);
    // setErrors(validate(values));
  };

  const clearInput = () => {
    let temp = {};
    setValues((values) => {
      for (let value in values) {
        temp[value] = '';
      }
      return {
        values: temp
      };
    });
  };

  return {
    handleChange,
    handleSubmit,
    clearInput,
    values,
    errors
  };
};

export default useForm;
