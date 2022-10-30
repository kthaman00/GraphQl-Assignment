import { useState } from 'react'
import { Link } from "react-router-dom";
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../forms/UpdatePerson'

import { EditOutlined } from '@ant-design/icons'
import Car from './Car'

const getStyles = () => ({
  card: {
    width: "550px",
    backgroundColor: "#eeeee4",
    marginBottom: '80px',
    border: '1px solid black',
    borderRadius:'25px'
  },
  divcontainer:{
    display:"flex",
    justifyContent:"right"
  }
});

const Person = (props)=> {
  const styles = getStyles()
  const [id] =useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = ()=> {
    setEditMode(!editMode)
  }

  const updateStateVariable = (variable, value) => {
    if(variable == "firstName"){
      setFirstName(value)
    }
    if(variable == "lastName"){
      setLastName(value)
    }
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key="cardB" onClick={handleButtonClick} />,
            <RemovePerson id={id} ownCars={props.ownCars}/>,
          ]}
          style={styles.card}
        >
          <p style={{
            fontWeight: 'bold',
            marginBottom: '24px',
            fontSize: '24px',
            }}>
            {firstName} {lastName}
          </p>
          {props.ownCars.map(({ id, make, model }) => (
            <Car key={id} id={id} make={make} model={model} />
          ))}
          <div style={styles.divcontainer}>
          <Link
            to={`/people/${id}`}
            style={{
              fontSize:13,
              fontWeight: 'bold',
              alignItems:"right",
              color: 'navy',
            }}
            >Click Me to Edit Car Info</Link>
            </div>
        </Card>
      )}
    </div>
  );
}

export default Person;