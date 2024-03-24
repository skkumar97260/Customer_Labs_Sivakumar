import React, { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { FcMinus } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";

const SaveAudience = () => {
  const [segment, setSegment] = useState("");
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name", type: "user" },
    { label: "Last Name", value: "last_name", type: "user" },
    { label: "Gender", value: "gender", type: "user" },
    { label: "Age", value: "age", type: "user" },
    { label: "Account Name", value: "account_name", type: "group" },
    { label: "City", value: "city", type: "group" },
    { label: "State", value: "state", type: "group" }
  ]);

  const [newSchemas, setNewSchemas] = useState([]);

  const handleSaveSegment = async () => {
    if (segment === "" || newSchemas.length === 0) {
      alert("Please fill the required fields");
    } else {
      try {
        const data = {
          segment_name: segment,
          schema: newSchemas.map((schema) => ({
            [schema.value]: schema.label
          }))
        };
        console.log("Sending data to server:", data);
        await axios.post(
          "https://webhook.site/f9ea9f68-5efd-4883-b56d-e7317f7b7282",
          data
        );
      } catch (error) {
        console.log(error);
      }

      setSegment("");
      setAvailableSchemas([
        { label: "First Name", value: "first_name", type: "user" },
        { label: "Last Name", value: "last_name", type: "user" },
        { label: "Gender", value: "gender", type: "user" },
        { label: "Age", value: "age", type: "user" },
        { label: "Account Name", value: "account_name", type: "group" },
        { label: "City", value: "city", type: "group" },
        { label: "State", value: "state", type: "group" }
      ]);
      setNewSchemas([]);
    }
  };

  const handleSegmentChange = (e) => {
    setSegment(e.target.value);
  };

  const handleSchemaChange = (e, index) => {
    const selectedSchemaValue = e.target.value;
    const selectedSchema = availableSchemas.find(
      (schema) => schema.value === selectedSchemaValue
    );

    const updatedSchemas = [...newSchemas];
    updatedSchemas[index] = selectedSchema;

    setNewSchemas(updatedSchemas);
    setAvailableSchemas(
      availableSchemas.filter((schema) => schema.value !== selectedSchemaValue)
    );
  };

  const handleAddNewSchema = () => {
    setNewSchemas([
      ...newSchemas,
      { label: "New Schema", value: "new_schema", type: "user" }
    ]);
  };

  const handleDeleteSchema = (index) => {
    const updatedSchemas = [...newSchemas];
    updatedSchemas.splice(index, 1);
    setNewSchemas(updatedSchemas);
  };

  return (
    <div className="main_container__inner">
      <header style={{position:"relative"}}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <MdArrowBackIos size={30} />
        </Link>
        Saving Audience
      </header>

      <div className="SaveAudience_container">
        <p>Enter the Name of the Segment</p>
        <input
          placeholder="Name of the segment"
          type="text"
          required
          value={segment}
          onChange={handleSegmentChange}
        />
        <p>
          To save your segment, you need to add the schemas to build the query
        </p>
        <div className="SaveAudience_container__traits">
          <p>🟢- User Traits</p>
          <p>🔴- Group Traits</p>
        </div>
        {newSchemas.map((schema, index) => (
          <div key={index} className="SaveAudience_container__inputs">
            <span>
              {schema.type === "user" ? <span>🟢</span> : <span>🔴</span>}
            </span>
            <select
              value={schema.value}
              onChange={(e) => handleSchemaChange(e, index)}
              className="SaveAudience_container__schemaInputs"
            >
              <option value="">{schema.label}</option>
              {availableSchemas.map((availableSchema) => (
                <option
                  key={availableSchema.value}
                  value={availableSchema.value}
                >
                  {availableSchema.label}
                </option>
              ))}
            </select>
            <span
              className="deleteIcon"
              onClick={() => handleDeleteSchema(index)}
            >
              <FcMinus size={30} />
            </span>
          </div>
        ))}
        <p className="SaveAudience_container__addSchema">
          +<span onClick={handleAddNewSchema}>Add new schema</span>
        </p>
      </div>

      <footer>
        <button
          className="SaveAudience_container__button"
          onClick={handleSaveSegment}
        >
          Save the Segment
        </button>
        <Link to="/" >
          <button className="cancel_btn">Cancel</button>
        </Link>
      </footer>
    </div>
  );
};

export default SaveAudience;
