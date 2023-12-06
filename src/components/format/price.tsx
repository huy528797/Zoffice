import React from "react";
import { FunctionComponent } from "react";

interface PriceProps {
  amount: number;
}

const Price: FunctionComponent<PriceProps> = ({ amount }) => {
  return <>{amount.toLocaleString()} đ</>;
};

export default Price;
