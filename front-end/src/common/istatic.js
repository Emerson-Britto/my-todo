const devENV = false/*process.env.NODE_ENV === 'development'*/;
const devUrl = 'http://localhost:9872';
const prodUrl = 'https://cdn-istatics.herokuapp.com'; // API (Privada) de outro projeto;
const baseUrl = devENV ? devUrl : prodUrl;

// API WRAPPER
class Istatic {
	contructor() {
		throw new Error ("The contructor must not be initialized");
	}

	static iconUrl(name, color='white', format='svg', dp=24) {
		return `${baseUrl}/static/icons/${name}_${color}_${dp}dp.${format}`;
	}

	static animatedSvgUrl(fileName) {
		return `${baseUrl}/static/icons/AnimatedSvg/${fileName}.svg`;
	}

	static staticPath(pathName) {
		return baseUrl + '/static/' + pathName;
	}
}

export default Istatic;
