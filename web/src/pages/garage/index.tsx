import React, { useEffect, useState } from "react";

import { useNuiEvent } from "../../hooks/useNuiEvent";
import { GarageProps, VehicleProps } from "../../types/garage";
import { debugData } from "../../utils/debugData";
import { fetchNui } from "../../utils/fetchNui";
import { isEnvBrowser } from "../../utils/misc";
import Compact from "./layouts/Compact";
import Full from "./layouts/Full";

const Garage = () => {
  const [visible, setVisible] = useState(true);
  const [garage, setGarage] = useState("");
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  const [filteredVehicles, setfilteredVehicles] = useState<VehicleProps[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Only attach listener when we are visible
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (["Escape"].includes(e.code)) {
        if (!isEnvBrowser()) fetchNui("hideFrame");
        else setVisible(!visible);
      }
    };
    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible]);

  useEffect(() => {
    const filtered = vehicles.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.plate.toLowerCase().includes(search.toLowerCase())
    );
    setfilteredVehicles(filtered);
  }, [search, vehicles]);

  useNuiEvent<boolean>("setVisible", setVisible);

  useNuiEvent("openGarage", (data: GarageProps) => {
    setVisible(data.visible);
    if (data.name) {
      setGarage(data.name);
    }
  });

  useNuiEvent("setVehicles", (data: VehicleProps[]) => {
    console.log(vehicles.length);
    setVehicles(data);
  });

  return (
    <>
      {visible && vehicles.length <= 15 ? (
        <Compact
          search={search}
          garage={garage}
          setSearch={setSearch}
          filteredVehicles={filteredVehicles}
        />
      ) : (
        visible &&
        vehicles.length > 15 && (
          <Full
            search={search}
            garage={garage}
            setSearch={setSearch}
            filteredVehicles={filteredVehicles}
          />
        )
      )}
    </>
  );
};

export default Garage;

debugData([
  {
    action: "openGarage",
    data: {
      visible: true,
      name: "Legion Garage",
    },
  },
]);

debugData([
  {
    action: "setVehicles",
    data: [
      {
        name: "Mustang",
        plate: "XYZ 123",
        fuel: 85,
        enginehealth: 95,
        bodyhealth: 90,
        engine: "V8",
        transmission: "Manual",
        suspension: "Sport",
        brakes: "Performance",
        turbo: "Twin-Turbo",
        armor: "Reinforced",
      },
      {
        name: "Challenger",
        plate: "ABC 789",
        fuel: 75,
        enginehealth: 88,
        bodyhealth: 85,
        engine: "V6",
        transmission: "Automatic",
        suspension: "Standard",
        brakes: "Stock",
        turbo: "None",
        armor: "Standard",
      },
      {
        name: "Camaro",
        plate: "CAM 456",
        fuel: 80,
        enginehealth: 92,
        bodyhealth: 87,
        engine: "V8",
        transmission: "Manual",
        suspension: "Sport",
        brakes: "Performance",
        turbo: "Single-Turbo",
        armor: "Reinforced",
      },
      {
        name: "Corvette",
        plate: "VET 678",
        fuel: 90,
        enginehealth: 93,
        bodyhealth: 91,
        engine: "V8",
        transmission: "Automatic",
        suspension: "Racing",
        brakes: "High-Performance",
        turbo: "Twin-Turbo",
        armor: "Reinforced",
      },
      {
        name: "Porsche",
        plate: "POR 234",
        fuel: 88,
        enginehealth: 90,
        bodyhealth: 89,
        engine: "Flat-6",
        transmission: "Automatic",
        suspension: "Sport",
        brakes: "Performance",
        turbo: "Twin-Turbo",
        armor: "Reinforced",
      },
      {
        name: "Ferrari",
        plate: "FER 890",
        fuel: 82,
        enginehealth: 94,
        bodyhealth: 92,
        engine: "V12",
        transmission: "Manual",
        suspension: "Racing",
        brakes: "High-Performance",
        turbo: "None",
        armor: "Reinforced",
      },
      {
        name: "Lamborghini",
        plate: "LAM 321",
        fuel: 78,
        enginehealth: 89,
        bodyhealth: 86,
        engine: "V12",
        transmission: "Automatic",
        suspension: "Racing",
        brakes: "High-Performance",
        turbo: "Twin-Turbo",
        armor: "Reinforced",
      },
      {
        name: "Aston Martin",
        plate: "AST 456",
        fuel: 85,
        enginehealth: 91,
        bodyhealth: 88,
        engine: "V12",
        transmission: "Automatic",
        suspension: "Sport",
        brakes: "Performance",
        turbo: "None",
        armor: "Standard",
      },
      {
        name: "Tesla",
        plate: "TES 789",
        fuel: 100,
        enginehealth: 98,
        bodyhealth: 95,
        engine: "Electric",
        transmission: "Automatic",
        suspension: "Sport",
        brakes: "Performance",
        turbo: "None",
        armor: "Reinforced",
      },
      {
        name: "BMW",
        plate: "BMW 234",
        fuel: 77,
        enginehealth: 85,
        bodyhealth: 80,
        engine: "Inline-6",
        transmission: "Manual",
        suspension: "Sport",
        brakes: "Performance",
        turbo: "Single-Turbo",
        armor: "Standard",
      },
      {
        name: "Audi",
        plate: "AUD 890",
        fuel: 79,
        enginehealth: 87,
        bodyhealth: 84,
        engine: "V6",
        transmission: "Automatic",
        suspension: "Sport",
        brakes: "Stock",
        turbo: "Single-Turbo",
        armor: "Standard",
      },
      {
        name: "Mercedes",
        plate: "MER 321",
        fuel: 83,
        enginehealth: 90,
        bodyhealth: 88,
        engine: "V8",
        transmission: "Automatic",
        suspension: "Luxury",
        brakes: "High-Performance",
        turbo: "None",
        armor: "Reinforced",
      },
      {
        name: "Jaguar",
        plate: "JAG 456",
        fuel: 76,
        enginehealth: 86,
        bodyhealth: 83,
        engine: "V8",
        transmission: "Manual",
        suspension: "Sport",
        brakes: "Performance",
        turbo: "None",
        armor: "Standard",
      },
      {
        name: "Jaguar",
        plate: "JAG 456",
        fuel: 76,
        enginehealth: 86,
        bodyhealth: 83,
        engine: "V8",
        transmission: "Manual",
        suspension: "Sport",
        brakes: "Performance",
        turbo: "None",
        armor: "Standard",
      },
      {
        name: "Jaguar",
        plate: "JAG 456",
        fuel: 76,
        enginehealth: 86,
        bodyhealth: 83,
        engine: "V8",
        transmission: "Manual",
        suspension: "Sport",
        brakes: "Performance",
        turbo: "None",
        armor: "Standard",
      },
      {
        name: "Jaguar",
        plate: "JAG 456",
        fuel: 76,
        enginehealth: 86,
        bodyhealth: 83,
        engine: "V8",
        transmission: "Manual",
        suspension: "Sport",
        brakes: "Performance",
        turbo: "None",
        armor: "Standard",
      },
      {
        name: "Jaguar",
        plate: "JAG 456",
        fuel: 76,
        enginehealth: 86,
        bodyhealth: 83,
        engine: "V8",
        transmission: "Manual",
        suspension: "Sport",
        brakes: "Performance",
        turbo: "None",
        armor: "Standard",
      },
    ],
  },
]);
