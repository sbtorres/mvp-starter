import React, { useState } from "react";

const useStockInputForm = callback => {
  const [inputs, setInputs] = useState({});

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    callback();
  };

  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};

export default useStockInputForm;
