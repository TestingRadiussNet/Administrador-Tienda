import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();

  useEffect(() => {
    function navegar() {
      navigate('/productos');
    }
    navegar();
  }, []);


  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center mt-2 font-bold">Estado del Stock</h1>
    </main>
  );
};

export default Inicio;
