const baseUrl = "https://www.omdbapi.com/";
const apikey = "e1075083";

const searchMovies = async (title, year, page) => {
	try {
		return await fetch(`${baseUrl}?apiKey=${apikey}&s=${title}&y=${year}&page=${page}&type=movie`).then((res) =>
			res.json()
		);
	} catch {
		return {};
	}
};

const getMovieInfo = async (imdbID) => {
	try {
		return await fetch(`${baseUrl}?apiKey=${apikey}&i=${imdbID}&type=movie`).then((res) => res.json());
	} catch {
		return {};
	}
};

export { searchMovies, getMovieInfo };
