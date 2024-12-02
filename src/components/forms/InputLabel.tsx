interface InputLabelProps {
	htmlFor: string,
	children: string
}


export const InputLabel = (p: InputLabelProps) => {
	return (
		<label 
			htmlFor={p.htmlFor}
			className="block text-sm font-medium text-default-black mb-1 ml-1"
		>
			{p.children}
		</label>
	);
};
