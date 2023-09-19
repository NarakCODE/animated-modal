import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { foods } from './components/data';

const App = () => {
	const [selectedId, setSelectedId] = useState(null);

	return (
		<div>
			<List setSelectedId={setSelectedId} />
			<Modal selectedId={selectedId} setSelectedId={setSelectedId} />
		</div>
	);
};

const Card = ({ setSelectedId, food }) => {
	return (
		<motion.div
			className="px-4 py-6 gap-4 shadow-md rounded-lg bg-white cursor-pointer"
			whileTap={{ scale: 0.98 }}
			onClick={() => setSelectedId(food)}
			layoutId={`card-${food.id}`}
		>
			<div className="w-full md:h-[200px] h-[300px] rounded-md overflow-hidden">
				<img src={food.url} className="w-full h-full object-cover" />
			</div>
			<div className="mt-6 flex flex-col items-start gap-4">
				<div className="w-full flex items-center justify-between">
					<h2 className="text-xl font-bold">{food.title}</h2>
					<h3 className="text-lg font-bold">{food.amount}$</h3>
				</div>

				<div className="flex items-center gap-2">
					<FcLike size={20} />
					<p>{food.likes}</p>
				</div>
				<div className="flex items-center gap-2">
					{food.categories.map((category) => {
						return (
							<p
								key={category}
								className="px-4 py-1 rounded-full bg-zinc-200 text-center font-semibold text-md"
							>
								{category}
							</p>
						);
					})}
				</div>
			</div>
		</motion.div>
	);
};

const List = ({ setSelectedId }) => {
	return (
		<div className="w-full max-w-[1400px] mx-auto p-4">
			<div>
				<h2 className="text-center text-4xl font-bold p-10">
					Narak's Restaurant
				</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{foods.map((food) => (
					<Card food={food} setSelectedId={setSelectedId} key={food.id} />
				))}
			</div>
		</div>
	);
};

const Modal = ({ selectedId, setSelectedId }) => {
	if (!selectedId) {
		return <></>;
	}
	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 bg-black/30 w-full h-screen flex items-center justify-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				onClick={() => setSelectedId(null)}
			>
				<motion.div
					className="w-full max-w-[600px] h-auto mx-5 px-6 py-8 bg-white rounded-lg"
					onClick={(e) => e.stopPropagation()}
					layoutId={`card-${selectedId.id}`}
				>
					<div className="w-full md:h-[300px] h-[200px] rounded-md overflow-hidden">
						<img src={selectedId.url} className="w-full h-full object-cover" />
					</div>
					<motion.div
						className="mt-6 flex flex-col items-start gap-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
					>
						<div className="w-full flex items-center justify-between">
							<h2 className="text-2xl font-bold">{selectedId.title}</h2>
							<h3 className="text-xl font-bold">{selectedId.amount}$</h3>
						</div>
						<p>{selectedId.details}</p>
						<div className="flex items-center gap-2">
							<FcLike size={20} />
							<p>{selectedId.likes}</p>
						</div>
						<div className="flex items-center gap-2">
							{selectedId.categories.map((category) => {
								return (
									<p
										key={category}
										className="px-4 py-1 rounded-full bg-zinc-200 text-center font-semibold text-md"
									>
										{category}
									</p>
								);
							})}
						</div>
						<button className="w-full bg-black text-white p-4 mt-6 font-bold text-lg hover:bg-[#222]">
							Order Now
						</button>
					</motion.div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default App;
