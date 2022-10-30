import Title from "./components/layout/Title";
import People from "./components/lists/People";
import AddPerson from "./components/forms/AddPerson";
import AddCar from "./components/forms/AddCar";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE_AND_CARS } from "./queries";

const AllPages = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE_AND_CARS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const peopleWithCars = data.people.map((person) => {
    return {
      ...person,
      ownCars: data.cars.filter((car) => car.personId === person.id),
    };
  });
  return (
    <div className="App">
      <Title />

      <AddPerson />
      {data.people.length > 0 && <AddCar />}
      <People peopleWithCars={peopleWithCars} />
    </div>
  );
};

export default AllPages;
