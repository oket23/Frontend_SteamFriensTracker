import { cn } from '../helpers/cn'

export default function HelloText({ text = 'World', isRed = false }) {
	return (
		<div className='flex items-center justify-center min-h-screen bg-neutral-600'>
			<div className='text-8xl font-bold'>
				<span className='text-white drop-shadow-[0_0_6px_#fff]'>Hello </span>
				<span
					className={cn('text-[#61DBFB] drop-shadow-[0_0_6px_#61DBFB]', {
						'text-red-500': isRed
					})}>
					{text}
				</span>
			</div>
		</div>
	)
}
