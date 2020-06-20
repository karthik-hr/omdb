import React from "react";
import { Descriptions, Modal, Space, Tag, Typography, Result, Skeleton } from "antd";

const moreInfoKeys = [
	"Awards",
	"BoxOffice",
	"Country",
	"DVD",
	"Genre",
	"Language",
	"Metascore",
	"Production",
	"Rated",
	"Released",
	"Runtime",
	"Website",
	"imdbID",
	"imdbRating",
	"imdbVotes",
];

const paragraphs = ["Plot", "Actors", "Writer", "Director"];

const MovieModal = ({ visible, loading, dataSource, onVisibilityChange }) => {
	const { Title, Poster, Year, Type, Response } = dataSource;

	const imdbRating = Number.parseFloat(dataSource["imdbRating"]);

	let content;
	let title;

	if (loading) {
		title = <Skeleton.Input style={{ width: "300px" }} active size={"small"} />;
	} else if (visible && Response !== "True") {
		title = "No Title";
		content = <Result status={"warning"} title={"Something went wrong"} />;
	} else {
		title = (
			<span>
				{Title} ({Year}) <Tag>{Type}</Tag>
			</span>
		);
		content = (
			<Space align={"start"}>
				<span>
					<img alt="poster" src={Poster} style={{ width: "168px" }} />
					<Typography.Paragraph>
						<b>Box Office</b>: {imdbRating > 7 ? "Hit" : "Flop"}
					</Typography.Paragraph>
				</span>
				<span>
					{paragraphs.map((label) => (
						<Typography.Paragraph>
							<b>{label}</b>: {dataSource[label]}
						</Typography.Paragraph>
					))}
					<Descriptions column={2} size={"small"}>
						{moreInfoKeys.map((lable) => (
							<Descriptions.Item label={lable}>{dataSource[lable]}</Descriptions.Item>
						))}
					</Descriptions>
				</span>
			</Space>
		);
	}

	return (
		<Modal
			width={"60%"}
			visible={visible}
			onCancel={() => onVisibilityChange(false)}
			closable={false}
			title={title}
			footer={false}
		>
			<Skeleton loading={loading} active avatar>
				{content}
			</Skeleton>
		</Modal>
	);
};

export default MovieModal;
