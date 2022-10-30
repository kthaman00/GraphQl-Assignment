import { useMutation } from "@apollo/client";
import { DeleteOutlined } from "@ant-design/icons";
import { GET_CARS, REMOVE_CAR } from "../../queries";
import { filter } from "lodash";

const RemoveCar = (props) => {
  const { id } = props;
  const [removeAllCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeAllCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (c) => c.id !== removeAllCar.id),
        },
      });
    },
  });
  const handleButtonClick = () => {
    let result = window.confirm("Do you want to remove this car?");
    if (result) {
      removeAllCar({
        variables: {
          id,
        },
      });
    }
  };
  return (
    <DeleteOutlined
      key="Deleted"
      onClick={handleButtonClick}
      style={{ color: "Red" }}
    />
  );
};

export default RemoveCar;
