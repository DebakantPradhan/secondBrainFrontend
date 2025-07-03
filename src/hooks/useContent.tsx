import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../BACKEND_URL';

function useContent() {
	const [contents, setContents] = useState([]);
	const fetchContent = async () => {
		const response = await axios.get(`${BACKEND_URL}/content`, {
			headers: {
				Authorization: localStorage.getItem('accessToken'),
			},
		});
		console.log(response);
		setContents(response.data.data.contents);
	};

	useEffect(() => {
		fetchContent();
	}, []);

	return { contents, refetch: fetchContent };
}

export default useContent;
