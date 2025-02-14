import React from "react";
import ToggleTable from "./ToggleTable.tsx";

const sampleData = [
  { col1: "Data 1", col2: "Data 2", col3: "Data 3" },
  { col1: "Data A", col2: "Data B", col3: "Data C" },
];

const App: React.FC = () => {
  return (
    <div>
      <ToggleTable
        headers={[
          "Text Column",
          <button key="btn">Click Me</button>,
          <img key="img" src="https://via.placeholder.com/50" alt="icon" />,
        ]}
        data={sampleData}
      />
    </div>
  );
};

export default App;
