import React, { useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import "./App.css";

interface TableProps {
  headers: (string | React.ReactNode)[]; // Accepts text, button, or image
  data: Record<string, any>[]; // Table data
}

const ToggleTable: React.FC<TableProps> = ({ headers, data }) => {
  const [showTable, setShowTable] = useState<boolean>(false);

  return (
    <Container className="mt-3">
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <Table striped bordered hover className="toggle-table">
          <thead>
            <tr>
              <th className="button-column">
                <Button
                  onClick={() => setShowTable(!showTable)}
                  variant="primary"
                >
                  {showTable ? "-" : "+"}
                </Button>
              </th>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          {showTable && (
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="data-row">
                  <td>&nbsp;</td>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      )}
    </Container>
  );
};

export default ToggleTable;
