import axios from 'axios';
import Delete from '../Icons/Delete';
import Doc from '../Icons/Doc';
import DocMd from '../Icons/DocMd';
import Share from '../Icons/ShareIcon';
import TwitterIcon from '../Icons/TwitterIcon';
import YoutubeIcon from '../Icons/YoutubeIcon';
import { BACKEND_URL } from '../../BACKEND_URL';

type contentType = 'tweet' | 'youtube' | 'text' | 'md';

export interface cardProps {
	category: contentType;
	title: string;
	link: string;
	content: string;
	id?:string;
	onDelete?: () => void;
}

export default function Card(props: cardProps) {
	const extractVideoId = (url: string) => {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	};

	const category = props.category;
	const videoId = extractVideoId(props.link);

	async function deleteContent() {
		axios.delete(`${BACKEND_URL}/content/${props.id as string}`,{
			headers:{
				"Authorization": localStorage.getItem('accessToken')
			}
		})
		if (props.onDelete) props.onDelete();
	}

	return (
		<div className="flex h-auto w-full flex-col rounded-md border border-slate-100 bg-white p-4 shadow-sm">
			<div className="mb-3 flex items-start justify-between text-md">
				<div className="flex min-w-0 flex-1 items-start">
					<div className="mr-3 flex-shrink-0 text-gray-500">
						{props.category == 'tweet' && <TwitterIcon size="xs" />}
						{props.category == 'youtube' && <YoutubeIcon size="xs" />}
						{props.category == 'text' && <Doc size="xs" />}
						{props.category == 'md' && <DocMd size="xs" />}
					</div>

					<h2 className="break-words text-sm font-bold leading-tight text-neutral-800 md:text-base">{props.title}</h2>
				</div>

				<div className="ml-2 flex flex-shrink-0 items-center gap-2 text-gray-500">
					<div className="pr-2">
						<Share size="xs" />
					</div>
					<div className="cursor-pointer" onClick={()=>{deleteContent()}}>
						<Delete size="xs" />
					</div>
					
				</div>
			</div>


			<div className="flex-1">		
				{category === 'youtube' && (
					<div className="flex-1 pt-4">
						<iframe
							className="w-full"
							src={`https://www.youtube.com/embed/${videoId}?si=14Ide91gYW8pZgji`}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						></iframe>
					</div>
				)}

				{category === 'tweet' && (
					<div  className="w-full max-w-full overflow-x-auto">
						<blockquote className="twitter-tweet w-full">
							<a href={props.link.replace('x.com', 'twitter.com')}></a>
						</blockquote>
					</div>
					
				)}

				{props.content && (

                    <p className="mt-4 break-words text-sm leading-relaxed text-gray-700 md:text-base">
                        {props.content}
                    </p>
                )}
			</div>
		</div>
	);
}
