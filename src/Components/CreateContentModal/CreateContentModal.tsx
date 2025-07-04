import CrossIcon from '../Icons/CrossIcon';
import Button from '../Button/Button';
import { useRef } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../BACKEND_URL';



interface modalProps {
	open: boolean;
	onClose: () => void;
	onSuccess?: () => void;
}

// controlled component
function CreateContentModal({ open, onClose, onSuccess }: modalProps) {

	const titleRef = useRef<HTMLInputElement>(null)
	const linkRef = useRef<HTMLInputElement>(null)
	const contentRef = useRef<HTMLInputElement>(null)
	const categoryRef = useRef<HTMLSelectElement>(null)

	async function CreateContentModal(){
		const title = titleRef.current?.value;
		const link = linkRef.current?.value;
		const content = contentRef.current?.value;
		const category = categoryRef.current?.value;

		await axios.post(`${BACKEND_URL}/content`,{
			category, title, link, content,accessToken:localStorage.getItem('accessToken')
		},{
			headers:{
				"Authorization": localStorage.getItem('accessToken')
			}
		})

		if (onSuccess) {
			onSuccess();
		}

		onClose()
	}

	return (
		<div>
			{open && (
				<div className="w-screen h-screen bg-slate-600 fixed top-0 left-0 opacity-92 flex justify-center items-center">
					<div className="p-4 rounded-md bg-white opacity-100 size-fit">
						<div className="flex justify-between" onClick={onClose}>
							Content
							<CrossIcon size="xs" />
						</div>

						<div className="pt-4 ">
							<InputForm placeholder="Title" reference={titleRef}  />
							<InputForm placeholder="link" reference={linkRef}/>
							<InputForm placeholder="content" reference={contentRef}/>
							<div className="m-2">
								<select 
									className="px-4 py-2 border rounded-md w-full"
									defaultValue=""
									ref = {categoryRef}
								>
									<option value="" disabled>Select content type</option>
									<option value="youtube">YouTube</option>
									<option value="tweet">Tweet</option>
									<option value="md">Markdown</option>
									<option value="text">Text</option>
								</select>
							</div>
						</div>
						<div className="flex justify-end  p-2">
							<Button variant="primary" size="md" text="Save" onClick={CreateContentModal} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CreateContentModal;

interface inputFormProps {
	reference?:React.RefObject<HTMLInputElement | null>;
	placeholder: string;
}

export function InputForm({ reference, placeholder }: inputFormProps) {
	return (
		<div>
			<input
				placeholder={placeholder}
				type="text"
				className="px-4 py-2 m-2 border rounded-md min-w-xs"
				ref = {reference}
			/>
		</div>
	);
}
