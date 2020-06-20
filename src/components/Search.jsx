import React from "react";
import { Button, DatePicker, Input, Space } from "antd";

const Search = ({ title, year, onTitleChange, onYearChange, onSearch }) => {
	const handleSearch = () => {
		if (typeof onSearch === "function") {
			onSearch();
		}
	};

	return (
		<Space>
			<Input value={title} onChange={onTitleChange} />
			<DatePicker.YearPicker value={year} onChange={onYearChange} />
			<Button onClick={handleSearch}>Search</Button>
		</Space>
	);
};

export default Search;
