import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@apollo/client";


import { ADD_CAR } from "../../queries";
import { GET_CARS } from "../../queries";
import { GET_PEOPLE } from "../../queries";

const AddCar = ()=> {
  const [id, setId] = useState(uuidv4())
  const [personId, setPersonId] = useState('')
  const [addAllCar] = useMutation(ADD_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

    useEffect(() => {
      forceUpdate({});
    }, []);

  const onFinish = values => {
    if (!personId) {
      alert("Select one Person");
    } else {
      const { make, model } = values;
      const year = parseInt(values.year);
      setId(uuidv4());
      const price = parseFloat(values.price);
      

      addAllCar({
        variables: {
          id,
          year,
          make,
          model,
          price,
          personId,
        },
        update: (proxy, { data: { addAllCar } }) => {
          const data = proxy.readQuery({ query: GET_CARS });
          proxy.writeQuery({
            query: GET_CARS,
            data: {
              ...data,
              cars: [...data.cars, addAllCar],
            },
          });
        },
      });
    }
  }

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <h3>Add a Car</h3>
      <Form
      
        form={form}
        name="addcar"
        layout="inline"
        size="middle"
        style={{
          marginBottom: "110px",
          width: "65%",
          justifyContent: "center",
          alignContent: "space-between",
          height: "100px",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          
          name="year"
          rules={[
            {
              required: true,
              message: "Enter the year of the car",
            },
          ]}
        >
          <Input placeholder="i.e. 2022"></Input>
        </Form.Item>
        <Form.Item
          name="make"
          rules={[
            {
              required: true,
              message: "Enter the make of the car",
            },
          ]}
        >
          <Input placeholder="i.e. BMW"></Input>
        </Form.Item>
        <Form.Item
          name="model"
          rules={[
            {
              required: true,
              message: "Enter the model of the car",
            },
          ]}
        >
          <Input placeholder="i.e. M Series"></Input>
        </Form.Item>
        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: "Enter the price of the car",
            },
          ]}
        >
          <Input placeholder="i.e. 20,000000"></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Select perosn for the car",
            },
          ]}
        >
          <Select
            style={{ width: "100px" }}
            placeholder="Select the person ID"
            name="personId"
            onChange={(value) => setPersonId(value)}
          >
            {data.people.map((person) => (
              <Select.Option key={person.id} value={person.id}>
                {person.id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                (!form.isFieldsTouched(true) && personId === "") ||
                form.getFieldError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add This Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
}

export default AddCar;