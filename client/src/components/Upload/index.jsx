/* eslint-disable react-refresh/only-export-components */
import { useRef, useCallback, useState, memo } from 'react';
import Styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

function FileUpload({ dispatch, setLoading }) {
	const onDrop = useCallback((acceptedFiles) => {
		if (acceptedFiles[0].type !== 'text/html') {
			toast.error('Invalid File Type');
			toast.info('Please Upload a HTML File');
			setLoading(false);
			return;
		}
		toast.info('Uploading File');
		setLoading(true);
		const formData = new FormData();
		formData.append('file', acceptedFiles[0]);
		axios
			.post('/api/file', formData)
			.then((res) => {
				console.log(res);
				dispatch({
					type: 'info-fetched',
					payload: res.data,
				});
				toast.success('File Uploaded Successfully');
			})
			.catch((err) => {
				toast.error('Error Uploading File');
				setLoading(false);
				console.error(err);
			});
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

function SiteLink({ dispatch, setLoading }) {
	const linkRef = useRef(null);
	function handleSubmit(e) {
		e.preventDefault();
		toast.info('Analyzing Site');
		setLoading(true);
		const formData = new FormData();
		formData.append('link', linkRef.current.value);
		axios
			.post('/api/link', formData)
			.then((res) => {
				console.log(res);
				dispatch({
					type: 'info-fetched',
					payload: res.data,
				});
				toast.success('Analysis Successful');
			})
			.catch((err) => {
				toast.error('Error Analyzing Site');
				setLoading(false);
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

function Upload({ dispatch }) {
	const [loading, setLoading] = useState(false);
	if (loading) return <h1>Loading...</h1>;
	return (
		<>
			<FileUpload
				dispatch={dispatch}
				setLoading={setLoading}
			/>
			<SiteLink
				dispatch={dispatch}
				setLoading={setLoading}
			/>
		</>
	);
}

FileUpload.propTypes = {
	dispatch: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired,
};

SiteLink.propTypes = {
	dispatch: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired,
};

Upload.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

const Container = Styled.div`
    padding: 12px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 10px;
    background-color: rgba(255,255,255,0.9);
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
