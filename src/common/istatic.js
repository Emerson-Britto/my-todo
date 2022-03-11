const devENV = process.env.NODE_ENV === 'development';
const devUrl = 'http://localhost:9872';
const prodUrl = 'https://cdn-istatics.herokuapp.com';
const baseUrl = devENV ? devUrl : prodUrl;

class Istatic {
	contructor() {
		throw new Error ("The contructor must not be initialized");
	}

	static iconUrl(name, color='white', format='svg', dp=24) {
		return `${baseUrl}/static/icons/${name}_${color}_${dp}dp.${format}`;
	}

	static path(pathName) {
		return baseUrl + pathName;
	}
}

export default Istatic;
