import Styled from 'styled-components';
import PropTypes from 'prop-types';

function Line({ line, bgcolor }) {
	if (!line) return <div>No Data</div>;
	return <Wrap bgcolor={bgcolor}>{line}</Wrap>;
}

function KeyLine({ line, bgcolor }) {
	if (!line) return <div>No Data</div>;
	return (
		<KeyWrap>
			<Wrap bgcolor={bgcolor}>{line[0]}</Wrap>
			<Wrap bgcolor={bgcolor}>{line[1]}</Wrap>
		</KeyWrap>
	);
}

function Data({ data, bgcolor, keyword }) {
	if (!data) return <Container>No Data</Container>;
	return (
		<Container>
			{keyword ? (
				<>
					{data.map((item, index) => (
						<KeyLine
							key={index}
							line={item}
							bgcolor={bgcolor}
						/>
					))}
				</>
			) : (
				<>
					{data.map((item, index) => (
						<Line
							key={index}
							line={item}
							bgcolor={bgcolor}
						/>
					))}
				</>
			)}
		</Container>
	);
}

function Seo({ good, bad, keywords }) {
	return (
		<>
			{good.length !== 0 && (
				<Data
					data={good}
					bgcolor={'rgb(220, 220, 255)'}
				/>
			)}
			{bad.length !== 0 && (
				<Data
					data={bad}
					bgcolor={'rgb(255, 220, 220)'}
				/>
			)}
			{keywords.length !== 0 && (
				<Data
					data={keywords}
					bgcolor={'rgb(220, 255, 220)'}
					keyword
				/>
			)}
		</>
	);
}

Seo.propTypes = {
	good: PropTypes.arrayOf(PropTypes.string),
	bad: PropTypes.arrayOf(PropTypes.string),
	keywords: PropTypes.arrayOf(PropTypes.string),
};

Seo.defaultProps = {
	good: [],
	bad: [],
	keywords: [],
};

Data.propTypes = {
	data: PropTypes.arrayOf(PropTypes.string),
	bgcolor: PropTypes.string,
	keyword: PropTypes.bool,
};

KeyLine.propTypes = {
	line: PropTypes.arrayOf(PropTypes.string),
	bgcolor: PropTypes.string,
};

Line.propTypes = {
	line: PropTypes.string,
	bgcolor: PropTypes.string,
};

const Container = Styled.div`
    padding: 16px 24px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 10px;
    background-color: rgba(255,255,255,0.8);
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
	border-radius: 2px;
	padding: 8px;
	margin: 6px auto;
	word-break: break-all;
    background-color: ${(props) => props.bgcolor};
`;

const KeyWrap = Styled.p`
    width: 100%;
    display: grid;
    grid-template-columns: 50% 40%;
    justify-content: space-around;
    align-items: center;
    text-align: center;
`;

export default Seo;
