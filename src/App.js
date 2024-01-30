import React, { useState, useEffect } from "react";
import Hero from "./components/hero/hero";
import Form from "./components/form/form";
import Validation from "./components/validation/validation";

function App() {
  const formSubmitted = JSON.parse(localStorage.getItem("formSubmitted")) || false;

  return (
    <> 
      <Hero />
      {formSubmitted ? (
        // Affichez le composant Validation tant que formSubmitted est true
        <Validation />
      ) : (
        // Affichez le formulaire tant que formSubmitted est false
        <Form />
      )}
    </>
  );
}

export default App;
