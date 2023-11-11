import React from "react";
import { FunctionComponent } from "react";
import { Box, Button, Text } from "zmp-ui";
import { CartItem as CartItemModel } from "../../models";
import Price from "../format/price";

const { Title } = Text;

interface CartItemProps {
  item: CartItemModel;
  onEdit?: () => void;
}

const CartItem: FunctionComponent<CartItemProps> = ({ item, onEdit }) => {
  console.log(item);
  return (
    <Box flex justifyContent="space-between" p={4}>
      <Box flex>
        <div className="zaui-avatar zaui-avatar-text-large">
          <img src={item.food.image} className="zaui-avatar-image" />
        </div>

        <div className="ml-6">
          <Title size="small">{item.food.name}</Title>
          {item.food.extras.map((extra) => (
            <Text key={extra.key}>
              {extra.label} {extra.options.find((o) => o.selected)?.label}
            </Text>
          ))}
          {item.food.options
            .filter((o) => o.selected)
            .map((option) => (
              <Text key={option.key}>{option.label}</Text>
            ))}
          {item.note && <>Ghi chú: {item.note}</>}
          <Box flex justifyContent="space-between">
            <Title size="small">Số lượng:</Title>
            <Title size="small">{item.quantity}x</Title>
          </Box>
        </div>
      </Box>
      <Box
        flex
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Text className="mr-2 ml-2 text-secondary mb-0" bold>
          <Price amount={item.food.price * item.quantity} />
        </Text>
        {onEdit && (
          <Button
            onClick={onEdit}
            variant="tertiary"
            className="font-bold -mr-4"
          >
            Thay đổi
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CartItem;
