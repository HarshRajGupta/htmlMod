/* eslint-disable react-refresh/only-export-components */
import { useRef, useCallback, useState, memo } from 'react';
import Styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

function FileUpload({
	setLinks,
	setImages,
	setSubmitted,
	setData,
	setGraph,
	setCode,
	setGood,
	setBad,
	setKeywords,
	setLoading,
}) {
	const onDrop = useCallback((acceptedFiles) => {
		toast.info('Uploading File');
		setLoading(true);
		const formData = new FormData();
		formData.append('file', acceptedFiles[0]);
		axios
			.post('/file', formData)
			.then((res) => {
				console.log(res);
				setLinks(res.data.links);
				setImages(res.data.images);
				setData(res.data.text);
				setGraph(res.data.graph);
				setCode(res.data.script);
				setGood(res.data.good);
				setBad(res.data.bad);
				setKeywords(res.data.keywords);
				toast.success('File Uploaded Successfully');
				setSubmitted(true);
			})
			.catch((err) => {
				console.error(err);
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
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

function SiteLink({
	setLinks,
	setImages,
	setSubmitted,
	setData,
	setGraph,
	setCode,
	setGood,
	setBad,
	setKeywords,
	setLoading,
}) {
	const linkRef = useRef(null);
	function handleSubmit(e) {
		e.preventDefault();
		toast.info('Analyzing Site');
		setLoading(true);
		const formData = new FormData();
		formData.append('link', linkRef.current.value);
		axios
			.post('/link', formData)
			.then((res) => {
				console.log(res);
				setLinks(res.data.links);
				setImages(res.data.images);
				setData(res.data.text);
				setGraph(res.data.graph);
				setCode(res.data.script);
				setGood(res.data.good);
				setBad(res.data.bad);
				setKeywords(res.data.keywords);
				toast.success('Analysis Successful');
				setSubmitted(true);
			})
			.catch((err) => {
				console.error(err);
			});
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

function Upload({
	setLinks,
	setImages,
	setSubmitted,
	setData,
	setGraph,
	setCode,
	setGood,
	setBad,
	setKeywords,
}) {
	const [loading, setLoading] = useState(false);
	if (loading) return <h1>Loading...</h1>;
	return (
		<>
			<FileUpload
				setLinks={setLinks}
				setImages={setImages}
				setSubmitted={setSubmitted}
				setData={setData}
				setGraph={setGraph}
				setCode={setCode}
				setGood={setGood}
				setBad={setBad}
				setKeywords={setKeywords}
				setLoading={setLoading}
			/>
			<SiteLink
				setLinks={setLinks}
				setImages={setImages}
				setSubmitted={setSubmitted}
				setData={setData}
				setGraph={setGraph}
				setCode={setCode}
				setGood={setGood}
				setBad={setBad}
				setKeywords={setKeywords}
				setLoading={setLoading}
			/>
		</>
	);
}

FileUpload.propTypes = {
	setLinks: PropTypes.func.isRequired,
	setImages: PropTypes.func.isRequired,
	setSubmitted: PropTypes.func.isRequired,
	setData: PropTypes.func.isRequired,
	setGraph: PropTypes.func.isRequired,
	setCode: PropTypes.func.isRequired,
	setGood: PropTypes.func.isRequired,
	setBad: PropTypes.func.isRequired,
	setKeywords: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired,
};

SiteLink.propTypes = {
	setLinks: PropTypes.func.isRequired,
	setImages: PropTypes.func.isRequired,
	setSubmitted: PropTypes.func.isRequired,
	setData: PropTypes.func.isRequired,
	setGraph: PropTypes.func.isRequired,
	setCode: PropTypes.func.isRequired,
	setGood: PropTypes.func.isRequired,
	setBad: PropTypes.func.isRequired,
	setKeywords: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired,
};

Upload.propTypes = {
	setLinks: PropTypes.func.isRequired,
	setImages: PropTypes.func.isRequired,
	setSubmitted: PropTypes.func.isRequired,
	setData: PropTypes.func.isRequired,
	setGraph: PropTypes.func.isRequired,
	setCode: PropTypes.func.isRequired,
	setGood: PropTypes.func.isRequired,
	setBad: PropTypes.func.isRequired,
	setKeywords: PropTypes.func.isRequired,
};

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

export default memo(Upload);
