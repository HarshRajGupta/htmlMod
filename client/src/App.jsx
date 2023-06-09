import { useState } from 'react';
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
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
// axios.defaults.withCredentials = true;

function App() {
	const [submitted, setSubmitted] = useState(false);
	const [images, setImages] = useState([]);
	const [links, setLinks] = useState([]);
	const [data, setData] = useState([]);
	const [graph, setGraph] = useState([]);
	const [code, setCode] = useState([]);
	const [good, setGood] = useState([]);
	const [bad, setBad] = useState([]);
	const [keywords, setKeywords] = useState([]);
	return (
		<Container>
			{submitted ? (
				<>
					<Page />
					<Graph graph={graph} />
					<Seo
						good={good}
						bad={bad}
						keywords={keywords}
					/>
					<Links links={links} />
					<Images images={images} />
					<Data data={data} />
					<Script code={code} />
				</>
			) : (
				<>
					<Upload
						setImages={setImages}
						setLinks={setLinks}
						setSubmitted={setSubmitted}
						setData={setData}
						setGraph={setGraph}
						setCode={setCode}
						setGood={setGood}
						setBad={setBad}
						setKeywords={setKeywords}
					/>
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
