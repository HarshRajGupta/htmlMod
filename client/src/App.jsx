import { Upload, Page } from './components';
import Styled from 'styled-components';

function App() {
	return (
		<Container>
			<Page />
			<Upload />
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
	overflow: hidden !important;
`;

export default App;
