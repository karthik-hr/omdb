import React from "react";
import { Button, Card, Space } from "antd";

const Movie = ({ dataSource, poster, showMoreInfo }) => {
	const posterImage = poster && <img alt="poster" src={dataSource.Poster} style={{ width: "128px" }} />;
	return (
		<Card hoverable style={{ display: "flex" }} cover={posterImage}>
			<Space direction={"vertical"}>
				<Card.Meta
					title={`${dataSource.Title} (${dataSource.Year})`}
					description={`imdbID: ${dataSource.imdbID}`}
				/>
				<Button onClick={() => showMoreInfo(true, dataSource.imdbID)}>More Info</Button>
			</Space>
		</Card>
	);
};

Movie.defaultProps = {
	dataSource: {},
	poster: false,
	showMoreInfo: () => {},
};

export default Movie;
