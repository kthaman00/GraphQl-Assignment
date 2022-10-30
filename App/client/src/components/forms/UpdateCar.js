import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, Select } from "antd";
import { UPDATE_CAR, GET_PEOPLE } from "../../queries";
import { useQuery } from "@apollo/client";

const UpdateCar = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState();
  
  const [updateAllCar] = useMutation(UPDATE_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error!... ${error.message}`;

  const onFinish = (values) => {
    if (!personId){
      alert("Select a person");
    } else {
      const { make, model } = values;
      const year = values.year;
      const price = values.price;

      updateAllCar({
        variables: {
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      });

      props.onButtonClick();
    }
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
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

  return (
    <Form
      form={form}
      name="updatepersonform"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId,
      }}
    >
      <Form.Item
        name="year"
        rules={[
          { required: true, message: "Enter the year of the car" },
        ]}
      >
        <Input
          placeholder="i.e. 2022"
          onChange={(e) => updateStateVariable("year", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="make"
        rules={[
          { required: true, message: "Enter the make of the car" },
        ]}
      >
        <Input
          placeholder="i.e. BMW"
          onChange={(e) => updateStateVariable("make", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="model"
        rules={[
          { required: true, message: "Enter the model of the car" },
        ]}
      >
        <Input
          placeholder="i.e. M Series"
          onChange={(e) => updateStateVariable("model", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="price"
        rules={[
          { required: true, message: "Enter the price of the car" },
        ]}
      >
        <Input
          placeholder="i.e. 20,00000"
          onChange={(e) => updateStateVariable("price", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Enter the person for the car",
          },
        ]}
      >
        <Select
          style={{ width: "150px" }}
          name="personId"
          defaultValue={props.personId}
          onChange={(value) => {
            setPersonId(value);
            updateStateVariable("personId", value)
          }}
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
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !personId) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel It</Button>
    </Form>
  );

  
};

export default UpdateCar;
