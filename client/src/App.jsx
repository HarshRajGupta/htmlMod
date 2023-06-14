import { useReducer } from 'react';
import Styled from 'styled-components';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import {
	Upload,
	Images,
	Links,
	Page,
	Data,
	Graph,
	Script,
	Seo,
} from './components';
import { initialState, reducer } from './reducer';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = import.meta.env.VITE_APP_SERVER_URL;

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<Container>
			{state.submitted ? (
				<>
					<Page />
					<Graph graph={state.graph} />
					<Seo
						good={state.good}
						bad={state.bad}
						keywords={state.keywords}
					/>
					<Links links={state.links} />
					<Images images={state.images} />
					<Data data={state.data} />
					<Script code={state.code} />
				</>
			) : (
				<>
					<Upload dispatch={dispatch} />
				</>
			)}
			<ToastContainer />
		</Container>
	);
}

const Container = Styled.div`
	background-color: whitesmoke;
  	background-image: url("https://www.transparenttextures.com/patterns/lyonnette.png");
	height: 100vh;
	display: grid;
  	justify-content:center;
  	align-items: center;
	overflow-x: hidden;
	overflow-y: auto;
`;

export default App;
