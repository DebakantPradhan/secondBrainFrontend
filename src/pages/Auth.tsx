import { useRef } from 'react';
import Button from '../Components/Button/Button';
import { InputForm } from '../Components/CreateContentModal/CreateContentModal';
import { BACKEND_URL } from '../BACKEND_URL';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface authType {
	signup?: boolean;
	signin?: boolean;
}


function Auth(props: authType) {
	return (
		<div>
			{props.signin && <SignIn />}

			{props.signup && <SignUp />}
		</div>
	);
}

export default Auth;

function SignUp() {
	const navigate =useNavigate()

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	async function signUp() {
		const username = usernameRef.current?.value;
		const password = passwordRef.current?.value;

		console.log(username);

		try {
			console.log(password);
			const response = await axios.post(`${BACKEND_URL}/user/signup`, {
				username: username,
				password: password,
			});

			console.log(response);
		} catch (error) {
			console.log(error);
		}

		// redirect to signin
		alert('signUp successful! Please sign in.');
		navigate('/signin')
	}

	return (
		<div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center p-6">
			<div className="border p-10 border-slate-400 rounded-xl">
				<h2 className="text-xl font-bold mb-4">Sign Up</h2>
				<InputForm placeholder="Username" reference={usernameRef} />
				<InputForm placeholder="Password" reference={passwordRef} />

				<div className="flex justify-end w-full mt-4">
					<Button size="md" variant="primary" text="SignUp" onClick={signUp} />
				</div>

				<div className="pt-4 m-2 text-sm">
					<p>
						Already an user ?{' '}
						<a className="pl-2.5 text-purple-500 font-semibold" href={`/signin`}>
							SignIn
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}

function SignIn() {
	const navigate = useNavigate()

	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	
	async function signIn() {
		const username = usernameRef.current?.value;
		const password = passwordRef.current?.value;
		console.log(username);
		
		try {
			console.log(password);
			const response = await axios.post(`${BACKEND_URL}/user/signin`, {
				username: username,
				password: password,
			});

			// const jwt = response.data.accessT
			console.log(response);

			const AccessToken = response.data.data.accessToken
			

			localStorage.setItem('accessToken', AccessToken)

			navigate('/dashboard')
			
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center p-6">
			<div className="border p-10 border-slate-400 rounded-xl">
				<h2 className="text-xl font-bold mb-4">Sign In</h2>
				<InputForm placeholder="Username" reference={usernameRef}/>
				<InputForm placeholder="Password" reference={passwordRef}/>

				<div className="flex justify-end w-full mt-4">
					<Button size="md" variant="primary" text="SignIn" onClick={signIn} />
				</div>

				<div className="pt-4 m-2 text-sm">
					<p>
						Don't have an account ?{' '}
						<a className="pl-2.5 text-purple-500 font-semibold" href={`/signup`}>
							SignUp
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
