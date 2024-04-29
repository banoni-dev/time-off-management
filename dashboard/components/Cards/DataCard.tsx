import {
  BadgeDelta,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";
import React from "react";

type Props = {
  name: string;
  amount: number;
};

const DataCard = (props: Props) => {
  const { name, amount } = props;
  return (
    <div>
      <Card className="mx-auto max-w-lg">
        <Flex alignItems="start">
          <div>
            <Text className="text-[18px]">{name}</Text>
            <Metric className="mt-3">{amount}</Metric>
          </div>
        </Flex>
      </Card>
    </div>
  );
};

export default DataCard;
