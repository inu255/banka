import { DownOutlined } from "@ant-design/icons";
import { Button, Drawer, List, Typography, Input } from "antd";
import { useState, useMemo } from "react";

type Option = {
  value: string | number;
  label: string;
};

type BottomSheetSelectProps = {
  placeholder?: string;
  options?: Option[];
  value?: { value: string | number; label: string };
  onChange?: (value: { value: string | number; label: string }) => void;
};

export function BottomSheetSelect({
  placeholder = "Выберите опцию",
  options = [],
  value,
  onChange,
}: BottomSheetSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSelect = (option: Option) => {
    onChange?.(option);
    setIsOpen(false);
    setSearch("");
  };

  const filteredOptions = useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase())),
    [options, search]
  );

  return (
    <>
      <Button
        block
        style={{
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={() => setIsOpen(true)}
      >
        <span>{value?.label || placeholder}</span>
        <DownOutlined />
      </Button>

      <Drawer
        title={placeholder}
        placement="bottom"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSearch(""); // сбрасываем поиск при закрытии
        }}
        height="50vh"
      >
        <Input
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 16 }}
          allowClear
        />
        <List
          dataSource={filteredOptions}
          renderItem={(option) => (
            <List.Item onClick={() => handleSelect(option)} style={{ cursor: "pointer" }}>
              <Typography.Text>{option.label}</Typography.Text>
            </List.Item>
          )}
          locale={{ emptyText: "Нет опций" }}
        />
      </Drawer>
    </>
  );
}
