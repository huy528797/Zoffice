import React from "react";
import { FunctionComponent } from "react";
import { Button, Icon, Picker, Text } from "zmp-ui";

const { Title } = Text;

interface TableBookerProps {
  value: string;
  onChange: (table: string) => void;
}

const TableBooker: FunctionComponent<TableBookerProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-ful space-y-2">
      <Title size="small">Chọn loại bàn</Title>
      <div className="relative w-full rounded-full bg-white h-14 flex items-center justify-between overflow-hidden border-none text-sm table-booker">
        <Picker
          mask
          maskClosable
          title="Chọn loại bàn"
          action={{
            text: "Chọn",
            close: true,
          }}
          placeholder="Chọn loại bàn"
          defaultValue={{ value }}
          onChange={({ table }) => onChange(table.value as string)}
          data={[
            {
              options: ["Bàn thường", "Bàn tiệc"].map((table) => ({
                value: table,
                displayName: `${table}`,
              })),
              name: "table",
            },
          ]}
        />
        <Button
          icon={<Icon icon="zi-chevron-down" />}
          variant="secondary"
          className="absolute top-1 right-1 pointer-events-none"
        ></Button>
      </div>
    </div>
  );
};

export default TableBooker;
