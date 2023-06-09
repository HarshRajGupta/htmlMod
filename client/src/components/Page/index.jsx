import Styled from 'styled-components';
function Page() {
	return (
		<Container>
			<iframe
				frameBorder={0}
				src={'http://127.0.0.1:8000/doc'}
			></iframe>
		</Container>
	);
}

const Container = Styled.div`
    padding: 12px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 10px;
    background-color: white;
	margin: 24px auto;
	display: grid;
	width: 60vw;
	* {
		width: 100%;
		height: 60vh;
	}
`;

export default Page;
