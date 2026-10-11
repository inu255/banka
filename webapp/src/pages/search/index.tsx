import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState, type ChangeEvent } from "react";

export default function SearchPage() {
  const [searchString, setSearchString] = useState("");

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchString(event.target.value);
  }

  return (
    <div>
      <Input
        autoFocus
        placeholder="Поиск"
        prefix={<SearchOutlined />}
        onChange={handleSearch}
        value={searchString}
      />
    </div>
  );
}
