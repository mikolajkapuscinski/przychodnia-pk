interface TitleProps {
  children: string;
}

export const Title = (p: TitleProps) => {
  return (
    <h2 className="mb-4 text-center text-2xl font-semibold text-default-black">
      {p.children}
    </h2>
  );
};
