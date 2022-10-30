import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON } from "../../queries";
import { Form, Input, Button } from "antd";

const UpdatePerson = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [updatePeople] = useMutation(UPDATE_PERSON);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePeople({
      variables: {
        id,
        firstName,
        lastName,
      },
    });

    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
    if(variable == "firstName"){
      setFirstName(value);
    }
    if(variable == "lastName"){
      setLastName(value);
    }

  };

  return (
    <Form
      form={form}
      name="updatepersonform"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        firstName: firstName,
        lastName: lastName,
      }}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Enter your First Name" }]}
      >
        <Input
          placeholder="i.e. Kapil"
          onChange={(e) => updateStateVariable("firstName", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Enter your Last Name" }]}>
        <Input
          placeholder="i.e. Thaman"
          onChange={(e) => updateStateVariable("lastName", e.target.value)}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("firstName") &&
                !form.isFieldTouched("lastName")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update This Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel It</Button>
    </Form>
  );
}

export default UpdatePerson;