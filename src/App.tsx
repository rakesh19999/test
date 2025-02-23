import React from "react";
import CollapsibleMenu from "./ToggleTable.tsx";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const data = [
  {
    modality: "MRI",
    imageSeries: [
      { id: "1", name: "Brain-PreGadTl- Axial" },
      { id: "2", name: "Brain-T2- Axial" },
      { id: "3", name: "Brain-PostGadT1-Axial" },
    ],
  },
  {
    modality: "PET",
    imageSeries: [
      { id: "10", name: "Whole Body-CTAC" },
      { id: "11", name: "Whole Body-PETAC" },
      { id: "12", name: "Whole Body-PETNAC" },
    ],
  },
];

const App = () => {
  return (
    <div>
      <CollapsibleMenu
        data={data}
        width="auto"
        openIcon={<FaChevronDown />}
        closeIcon={<FaChevronRight />}
        renderItem={(item) => (
          <div>
            <span>{item.name}</span>
            <span>{item.name}</span>
            <button style={{ marginLeft: "10px" }}>View</button>
            <button style={{ marginLeft: "10px" }}>View</button>{" "}
            <button style={{ marginLeft: "10px" }}>View</button>{" "}
            <button style={{ marginLeft: "10px" }}>View</button>
          </div>
        )}
      />
    </div>
  );
};

export default App;
