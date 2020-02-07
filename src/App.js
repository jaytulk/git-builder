import React, { useState } from "react";
import "./App.css";
import { Header, Form, Segment } from "semantic-ui-react";

import { conceptOptions, operationOptions } from "./constants";
import { generateCsv } from "./utilities";

function App() {
  const [concepts, setConcepts] = useState([conceptOptions[0].value]);
  const [filename, setFilename] = useState("My Kit");
  const [highestNumber, setHighestNumber] = useState(10);
  const [lowestNumber, setLowestNumber] = useState(0);
  const [maxResultCount, setMaxResultCount] = useState(50);
  const [operations, setOperations] = useState([operationOptions[0].value]);

  const downloadCsv = () => {
    const csvContent = generateCsv({
      concepts,
      highestNumber,
      lowestNumber,
      maxResultCount,
      operations
    });

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(csvContent.join("\n"))
    );
    element.setAttribute("download", `${filename}.csv`);

    element.style.display = "none";
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
  };

  return (
    <div className="app-container">
      <Header as="h2" attached="top">
        <span role="img" aria-label="">
          💅
        </span>{" "}
        Kit Builder{" "}
        <span role="img" aria-label="">
          💅
        </span>
      </Header>
      <Segment attached className="form-container">
        <Form onSubmit={downloadCsv}>
          <Form.Input
            label="File Name"
            value={filename}
            onChange={(_, { value }) => setFilename(value)}
          />
          <Form.Group widths="equal">
            <Form.Input
              id="lowestNumber"
              label="Lowest Number"
              type="number"
              value={lowestNumber}
              onChange={(_, { value }) => setLowestNumber(value)}
            />
            <Form.Input
              id="highestNumber"
              label="Highest Number"
              type="number"
              value={highestNumber}
              onChange={(_, { value }) => setHighestNumber(value)}
            />
          </Form.Group>

          <Form.Select
            id="operations"
            onChange={(_, { value }) => setOperations(value)}
            label="Operations"
            multiple
            value={operations}
            options={operationOptions}
          ></Form.Select>
          <Form.Select
            id="concepts"
            onChange={(_, { value }) => setConcepts(value)}
            label="Concepts"
            multiple
            value={concepts}
            options={conceptOptions}
          ></Form.Select>
          <Form.Input
            label="Max Result Count"
            value={maxResultCount}
            onChange={(_, { value }) => setMaxResultCount(value)}
            type="number"
            min={1}
            max={400}
          />
          <Form.Button>Generate</Form.Button>
        </Form>
      </Segment>
    </div>
  );
}

export default App;
