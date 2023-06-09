import Styled from 'styled-components';
import PropTypes from 'prop-types';

function Image({ image }) {
	if (!image || !image.length || !image[0]) return <Box>Loading...</Box>;
	return (
		<Box>
			<Wrap>
				{image[1] && image[1] !== '' && image[1] !== ' ' && (
					<>{image[1]}</>
				)}
			</Wrap>
			<img
				src={image[0]}
				alt={image[1]}
			/>
		</Box>
	);
}

Image.propTypes = {
	image: PropTypes.arrayOf(PropTypes.string),
};

Image.defaultProps = {
	image: [],
};

function Images({ images }) {
	if (!images.length) return <Container>No image found</Container>;
	return (
		<Container>
			{images.map((image, index) => (
				<Image
					key={index}
					image={image}
				/>
			))}
		</Container>
	);
}

Images.propTypes = {
	images: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

Images.defaultProps = {
	images: [],
};

const Container = Styled.div`
    padding: 16px 24px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 10px;
    background-color: white;
	margin: 24px auto;
	display: grid;
	width: 75vw;
	grid-template-columns: 1fr 1fr;
	justify-content: space-around;
`;

const Box = Styled.div`
	display: grid;
	justify-content: center;
	align-items: center;
	background-color: rgb(240, 240, 240);
	padding: 12px;
	margin: 12px auto;
    border-radius: 4px;
	img {
		max-width: 33vw;
		margin: 12px auto;
		object-fit: contain;
	}
	width: calc(33vw + 24px);
`;

const Wrap = Styled.div`
	width: 100%;
	text-align: center;
	margin: auto;
`;

export default Images;
