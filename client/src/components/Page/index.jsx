import Styled from 'styled-components';
function Page() {
	return (
		<Container>
			<iframe
				frameBorder={0}
				src={`${import.meta.env.VITE_APP_SERVER_URL}/doc`}
				loading="lazy"
			></iframe>
		</Container>
	);
}

const Container = Styled.div`
    padding: 12px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 10px;
    background-color: rgba(255,255,255,0.8);
	margin: 24px auto;
	display: grid;
	width: 60vw;
	* {
		width: 100%;
		height: 60vh;
	}
`;

export default Page;
