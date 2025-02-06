import React, { useState } from "react";
import { Button, Table, Container } from "react-bootstrap";

const ToggleTable = () => {
  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <Container className="mt-3">
      <div className="d-flex align-items-center">
        <Table
          striped
          bordered
          hover
          className="mb-0 w-auto"
          style={{ tableLayout: "fixed", width: "500px" }}
        >
          <thead>
            <tr>
              <th style={{ width: "10%", textAlign: "center" }}>
                <Button
                  onClick={toggleTable}
                  variant="primary"
                  className="me-2"
                >
                  {showTable ? "-" : "+"}
                </Button>
              </th>
              <th style={{ width: "30%", textAlign: "center" }}>Test</th>
              <th style={{ width: "30%", textAlign: "center" }}>Time</th>
              <th style={{ width: "30%", textAlign: "center" }}>Date</th>
            </tr>
          </thead>
          {showTable && (
            <tbody>
              <tr>
                <td></td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  Sample Test 1
                </td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  10:00 AM
                </td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  2025-02-06
                </td>
              </tr>
              <tr>
                <td></td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  Sample Test 2
                </td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  02:30 PM
                </td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  2025-02-07
                </td>
              </tr>
              <tr>
                <td></td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  Sample Test 3
                </td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  04:45 PM
                </td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  2025-02-08
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>
    </Container>
  );
};

export default ToggleTable;
