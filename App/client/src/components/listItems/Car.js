import { useState } from "react";
import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";

import { EditOutlined } from "@ant-design/icons";

const Car = ({id, make, model}) => {

  return (
    <Card
      type="outer"
      style={{
        width: "85%",
        margin: "25px auto",
        backgroundColor: "#f6d7a0",
      }}
      actions={[<RemoveCar id={id} />]}
    >
      {make} {model}
    </Card>
  );
};

export default Car;
