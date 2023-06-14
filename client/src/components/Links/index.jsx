import Styled from 'styled-components';
import PropTypes from 'prop-types';

function Link({ link }) {
	if (!link || !link.length || !link[0]) return <Box>Loading...</Box>;
	return (
		<Box>
			<Wrap>
				{link[1] && link[1] !== '' && link[1] !== ' ' && <>{link[1]}</>}
			</Wrap>
			<iframe
				src={link[0]}
				title={link[1]}
				frameBorder={0}
			/>
			<Wrap>
				<a
					href={link[0]}
					target="_blank"
					rel="noreferrer"
				>
					<p>{link[0]}</p>
				</a>
			</Wrap>
		</Box>
	);
}

Link.propTypes = {
	link: PropTypes.arrayOf(PropTypes.string),
};

Link.defaultProps = {
	link: [],
};
function Links({ links }) {
	if (!links.length) return <Container>No link found</Container>;
	return (
		<Container>
			{links.map((link, index) => (
				<Link
					key={index}
					link={link}
				/>
			))}
		</Container>
	);
}

Links.propTypes = {
	links: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

Links.defaultProps = {
	links: [],
};

const Container = Styled.div`
    padding: 16px 24px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 10px;
    background-color: rgba(255,255,255,0.8);
	margin: 24px auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: 75vw;
	justify-content: space-around;
	/* text-align: center; */
`;

const Box = Styled.div`
	display: grid;
	grid-template-columns: 1fr;
	justify-content: center;
	align-items: center;
	background-color: rgb(240, 240, 240);
	padding: 12px;
	margin: 12px auto;
    border-radius: 4px;
	iframe {
		width: 33vw;
		height: 35vh;
		margin: 12px auto;
	}
	/* max-width: 30vw; */
`;

const Wrap = Styled.div`
	width: 33vw;
	text-align: center;
	* {
		overflow-x: hidden;
		word-wrap: break-word;
	}
	margin: auto;
`;

export default Links;
