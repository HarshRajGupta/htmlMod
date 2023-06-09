import Styled from 'styled-components';
import PropTypes from 'prop-types';

function Line({ line }) {
	if (!line) return <div>No Data</div>;
	return (
		<Wrap>
			{line.map((item, index) => (
				<span key={index}>{item}&nbsp;</span>
			))}
		</Wrap>
	);
}

Line.propTypes = {
	line: PropTypes.arrayOf(PropTypes.string),
};

function Data({ data }) {
	if (!data) return <Container>No Data</Container>;
	return (
		<Container>
			{data.map((item, index) => (
				<Line
					key={index}
					line={item}
				/>
			))}
		</Container>
	);
}

Data.propTypes = {
	data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

const Container = Styled.div`
    padding: 16px 24px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 10px;
    background-color: white;
	margin: 24px auto;
	display: grid;
	grid-template-columns: 1fr;
	width: 75vw;
	justify-content: space-around;
`;

const Wrap = Styled.p`
	display: inline;
	width: 100%;
	/* justify-content: space-around; */
	background-color: rgb(220, 220, 220);
	border-radius: 2px;
	padding: 8px;
	margin: 4px auto;
	word-break: break-all;
`

export default Data;
