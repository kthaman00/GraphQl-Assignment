import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { v4 as uuidv4 } from "uuid";

import { ADD_PERSON, GET_PEOPLE } from "../../queries";

const AddPerson = ()=> {
  const [id, setId] = useState(uuidv4())
  const [addPeople] = useMutation(ADD_PERSON);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

    useEffect(() => {
      forceUpdate({});
    }, []);

  const onFinish = values => {
    const { firstName, lastName } = values
    setId(uuidv4());
    addPeople({
      variables: {
        id,
        firstName,
        lastName,
      },
      
      update: (cache, { data: { addPeople } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE })
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPeople],
          },
        })
      },
    })
  }

  return (
    <>
    <h3>Add Person</h3>
      <Form
        form={form}
        name="addperson"
        layout="inline"
        size="large"
        style={{ marginBottom: "90px" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Enter your First Name",
            },
          ]}
        >
          <Input placeholder="i.e. Kapil"></Input>
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Last your Last Name",
            },
          ]}
        >
          <Input placeholder="i.e. Thaman"></Input>
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add This Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
}

export default AddPerson;