import { useRef, useCallback } from 'react';
import Styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

function FileUpload() {
	const onDrop = useCallback((acceptedFiles) => {
		console.log(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});
	return (
		<Container>
			<Wrap>
				<Box>
					<Text>
						<div
							className="dropzone-div"
							{...getRootProps()}
						>
							<input
								className="dropzone-input"
								{...getInputProps()}
							/>
							<div className="text-center">
								{isDragActive ? (
									<p className="dropzone-content">
										Release to drop the file here
									</p>
								) : (
									<p className="dropzone-content">
										Drag n Drop file here, or click to
										select file
									</p>
								)}
							</div>
						</div>
					</Text>
				</Box>
			</Wrap>
		</Container>
	);
}

function SiteLink() {
	const linkRef = useRef(null);
	function handleSubmit(e) {
		e.preventDefault();
		console.log(linkRef.current.value);
	}
	return (
		<Container>
			<Box onSubmit={handleSubmit}>
				<LinkForm>
					<Link
						type="text"
						placeholder="Enter Site Link"
						ref={linkRef}
					/>
					<SubmitButton>
						<input type="submit" />
						Submit
					</SubmitButton>
				</LinkForm>
			</Box>
		</Container>
	);
}

function Upload() {
	return (
		<>
			<FileUpload />
			<SiteLink />
		</>
	);
}
const Container = Styled.div`
    padding: 12px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 10px;
    background-color: white;
    
`;
const Wrap = Styled.div`
    background: url("/assets/htm.png") no-repeat center center;
    background-size: 25%;
    height: 50vh;
`;

const Box = Styled.form`
    width: 75vw;
    height: 100%;
    border: 8px dashed #e6f5e9;
    display: grid;
    align-items: center;
    border-radius: 5px;
    grid-template-columns: 1fr;
    padding: 12px;
`;

const Text = Styled.div`
    margin: auto;
    font-size: 40px;
    color: #0c3214;
    letter-spacing: 1.5px;
    width: 100%;
    height: 100%;
    .dropzone-div {
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
    }
`;

const LinkForm = Styled.div`
    width: 100%;
    margin: auto;
    display: grid;
    grid-template-columns: 4fr 1fr;
    justify-content: space-around;
`;

const SubmitButton = Styled.label`
    input[type="submit"] {
        display: none;
    }
    margin: auto;
    font-size: 20px;
    background: #28A745;
    padding: 8px;
    border-radius: 10px;
    color: #fff;
`;

const Link = Styled.input`
    border: none;
    margin: auto;
    font-size: 20px;
    width: 100%;
    border-bottom: 3px dashed #e6f5e9;
    border-radius: 2px;
    &:focus {
        outline: none;
        border-color: #28A745;
    }
`;

export default Upload;
