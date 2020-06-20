import React from "react";
import { Layout } from "antd";

const Header = ({ title }) => {
	return (
		<Layout.Header style={{ position: "fixed", width: "100%", zIndex: 1000 }}>
			<span style={{ color: "#fff", fontSize: "18px" }}>{title}</span>
		</Layout.Header>
	);
};

export default Header;
