import React from "react";
import "antd/dist/antd.css";
import { Layout, Tabs, Spin, Pagination } from "antd";

import Header from "./Header";
import MovieList from "./MovieList";
import Search from "./Search";
import Modal from "./Modal";

import { searchMovies, getMovieInfo } from "../apis/api";

class App extends React.PureComponent {
	state = {
		loading: false,
		modalLoading: true,
		activeTab: "1",
		title: "",
		year: "",
		movies: [],
		movie: {},
		page: 1,
		visible: false,
	};

	handleTabChange = (activeTab) => {
		this.setState({ activeTab, title: "", year: "", page: 1, movies: [] });
	};

	handleTitleChange = (e) => {
		this.setState({ title: e.target.value });
	};

	handleYearChange = (year) => {
		this.setState({ year });
	};

	fetchMovies = async () => {
		const { title, year, page } = this.state;
		if (title && year) {
			this.setState({ loading: true, movies: [] });
			const response = await searchMovies(title, year.year(), page);
			this.setState({ loading: false, movies: response });
		}
	};

	changeModalVisibility = async (visible, imdb) => {
		this.setState({ visible, modalLoading: visible, movie: {} });
		if (visible) {
			const response = await getMovieInfo(imdb);
			this.setState({ visible, modalLoading: false, movie: response });
		}
	};

	handlePageChange = (page) => {
		this.setState({ page, loading: true }, this.fetchMovies);
	};

	render() {
		const { loading, modalLoading, activeTab, title, year, movies, movie, visible } = this.state;
		const totalResults = Number.parseInt(movies.totalResults);

		const search = (
			<Search
				title={title}
				year={year}
				onTitleChange={this.handleTitleChange}
				onYearChange={this.handleYearChange}
				onSearch={this.fetchMovies}
			/>
		);

		const pagination = totalResults ? (
			<Pagination
				defaultCurrent={1}
				total={totalResults}
				onChange={this.handlePageChange}
				showSizeChanger={false}
			/>
		) : (
			""
		);
		return (
			<Layout>
				<Header title={"OMDB"} renderTabs={this.renderTabs} />
				<Layout.Content style={{ padding: "78px 14px 14px", minHeight: "100vh" }}>
					<Spin spinning={loading}>
						<Tabs value={activeTab} onChange={this.handleTabChange} tabBarExtraContent={search}>
							<Tabs.TabPane tab={"Screen One"} key={"1"}>
								<MovieList dataSource={movies} showMoreInfo={this.changeModalVisibility} />
							</Tabs.TabPane>
							<Tabs.TabPane tab={"Screen Two"} key={"2"}>
								<MovieList
									dataSource={movies}
									poster={true}
									showMoreInfo={this.changeModalVisibility}
								/>
							</Tabs.TabPane>
						</Tabs>
						{pagination}
					</Spin>
					<Modal
						loading={modalLoading}
						visible={visible}
						dataSource={movie}
						onVisibilityChange={this.changeModalVisibility}
					/>
				</Layout.Content>
			</Layout>
		);
	}
}

export default App;
