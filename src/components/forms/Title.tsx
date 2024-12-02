interface TitleProps {
	children: string
}

export const Title = (p: TitleProps) => {
	return (
        <h2 className="text-2xl font-semibold text-center text-default-black mb-4">
            {p.children}
        </h2>
	);
};
