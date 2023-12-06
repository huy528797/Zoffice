import { FunctionComponent, useState } from "react";
import { Avatar, Button, Icon, Text } from "zmp-ui";
import { Food } from "../../../models";
import Price from "../../../components/format/price";
import React from "react";
import FoodPicker from "../../food-picker";

const { Title } = Text;

interface FoodItemProps {
  food: Food;
}

const FoodItem: FunctionComponent<FoodItemProps> = ({ food }) => {
  return (
    <FoodPicker food={food}>
      {(open) => (
        <div
          onClick={open}
          className="p-3 bg-white text-center space-y-2"
          style={{ borderRadius: 15 }}
        >
          <Avatar size={110} src={food.image} />
          <Title size="small">{food.name}</Title>
          <Text size="xLarge" className="text-secondary font-semibold">
            <Price amount={food.price} />
          </Text>
          <Button icon={<Icon icon="zi-plus" />}></Button>
        </div>
      )}
    </FoodPicker>
  );
};

export default FoodItem;
