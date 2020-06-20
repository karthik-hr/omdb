import React from "react";
import Movie from "./Movie";
import { Result, Space } from "antd";

const MovieList = ({ dataSource, poster, showMoreInfo }) => {
	if (dataSource.Response === "False") {
		return <Result status={"warning"} title={dataSource.Error} />;
	}

	return (
		<Space direction={"vertical"}>
			{dataSource?.Search?.map((movie) => (
				<Movie dataSource={movie} poster={poster} showMoreInfo={showMoreInfo} />
			))}
		</Space>
	);
};

export default MovieList;
