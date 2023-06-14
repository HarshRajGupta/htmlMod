export const initialState = {
	submitted: false,
	images: [],
	links: [],
	data: [],
	graph: null,
	code: [],
	good: [],
	bad: [],
	keywords: [],
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'info-fetched':
			return {
				...state,
				submitted: true,
				images: action.payload.images,
				links: action.payload.links,
				data: action.payload.text,
				graph: action.payload.graph,
				code: action.payload.script,
				good: action.payload.good,
				bad: action.payload.bad,
				keywords: action.payload.keywords,
			};
		default:
			return state;
	}
};
