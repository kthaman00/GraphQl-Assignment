import { useState } from "react";
import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";

import { EditOutlined } from "@ant-design/icons";

const CarDetail = (props) => {
  const [id] = useState(props.id);
  const [, setYear] = useState(props.year);
  const [, setMake] = useState(props.make);
  const [, setModel] = useState(props.model);
  const [, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    if(variable == "year"){
      setYear(value)
    }
    if(variable == "make"){
      setMake(value)
    }
    if(variable == "model"){
      setModel(value)
    }
    if(variable == "price"){
      setPrice(value)
    }
    if(variable == "personId"){
      setPersonId(value)
    }
  };

  const numberWithComma = new Intl.NumberFormat();
  const formattedPrice = numberWithComma.format(props.price);

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={props.id}
          year={props.year}
          make={props.make}
          model={props.model}
          price={props.price}
          personId={personId}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          type="outer"
          style={{
            width: "80%",
            margin: "10px auto",
            border: "1px solid red",
            marginBottom: "50px",
          }}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />,
          ]}
        >
          <p>
            <span className="cardetail">Year:</span> {props.year}
          </p>
          <p>
            <span className="cardetail">Make:</span> {props.make}
          </p>
          <p>
            <span className="cardetail">Model:</span> {props.model}
          </p>
          <p>
            <span className="cardetail">Price:</span> ${formattedPrice}
          </p>
          <p>
            <span className="cardetail">Owner</span> ID: {props.personId}
          </p>
        </Card>
      )}
    </div>
  );
};

export default CarDetail;
