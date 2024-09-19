'use client';

import PartialReproduction from "./partial-reproduction/PartialReproduction";
import FullReproduction from "./full-reproduction/FullReproduction";
import { useState } from "react";

export default function Reproduction() {
  const [isFullReproductionVisible, setIsFullReproductionVisible] = useState(false);

  const showFullReproduction = () => {
    setIsFullReproductionVisible(true);
    console.log("mostrar");
  };

  const hideFullReproduction = () => {
    setIsFullReproductionVisible(false);
    console.log("ocultar");
  };

  return (
    <section className="col-span-4">
      {isFullReproductionVisible ? (
        <FullReproduction hideFullReproduction={hideFullReproduction} />
      ) : (
        <PartialReproduction showFullReproduction={showFullReproduction}  />
      )}
    </section>
  );
}
