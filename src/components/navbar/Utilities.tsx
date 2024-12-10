import { Button } from "../forms/Button";

export const Utilities: React.FC = () => {
  return (
    <div className="flex w-1/3 items-center justify-end gap-3 px-3">
      <p>{new Date().toDateString()}</p>
      <Button
        className="flex h-12 w-12 items-center justify-center"
        variant={"secondary"}
        size={"xs"}
      >
        <img className="w-4" src="/lupa.png" alt="search" />
      </Button>
      <Button
        className="flex h-12 w-12 items-center justify-center"
        variant={"secondary"}
        size="xs"
      >
        <img className="w-4" src="/bell.png" alt="notifications" />
      </Button>
    </div>
  );
};
