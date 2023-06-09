import Styled from 'styled-components';
import PropTypes from 'prop-types';
import { Highlight, themes } from 'prism-react-renderer';
import jsBeautify from 'js-beautify';

// const codeBlock = `
// int main() {
//     return 0;
// }
// `;

function CodeBlock({ code }) {
	const formattedCode = jsBeautify.js(code, {
		indent_size: 4,
		space_in_empty_paren: true,
		end_with_newline: true,
		keep_array_indentation: true,
	});
	return (
		<Highlight
			theme={themes.vsLight}
			code={formattedCode}
			language="js"
		>
			{({ style, tokens, getLineProps, getTokenProps }) => (
				<pre
					style={style}
					className="box"
				>
					{tokens.map((line, i) => (
						<div
							key={i}
							{...getLineProps({ line })}
						>
							{line.map((token, key) => (
								<span
									key={key}
									{...getTokenProps({ token })}
								/>
							))}
						</div>
					))}
				</pre>
			)}
		</Highlight>
	);
}

function Script({ code }) {
	if (!code) return <Container>Loading...</Container>;
	return (
		<>
			{code.length !== 0 && (
				<Container>
					{code.map((codeBlock, index) => (
						<CodeBlock
							code={codeBlock}
							key={index}
						/>
					))}
				</Container>
			)}
		</>
	);
}

Script.propTypes = {
	code: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CodeBlock.propTypes = {
	code: PropTypes.string.isRequired,
};
const Container = Styled.div`
    padding: 8px 32px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 10px;
    background-color: white;
	margin: 24px auto;
	display: grid;
	grid-template-columns: auto;
	width: 75vw;
    .box {
        display: grid;
        * {
            max-width: 70vw;
            word-wrap: break-word;
        }
        overflow-x: auto;
    }
`;

export default Script;
