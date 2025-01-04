import { useState } from "react";
import { Button } from "../forms/Button";
import { LoggedUserOptions } from "./LoggedUserOptions";
import { useSession } from "next-auth/react";

export const Utilities: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="flex w-1/3 items-center justify-end gap-2 px-3">
      <p>{new Date().toDateString()}</p>
      <Button
        className="flex h-12 min-w-12 items-center justify-center"
        variant={"secondary"}
        size={"xs"}
      >
        <img className="w-4" src="/lupa.png" alt="search" />
      </Button>
      <Button
        className="flex h-12 min-w-12 items-center justify-center"
        variant={"secondary"}
        size="xs"
      >
        <img className="w-4" src="/bell.png" alt="notifications" />
      </Button>
      <Button
        onClick={() => setIsPopoverOpen((prev) => !prev)}
        className="flex h-12 min-w-20 items-center justify-center"
        variant={"secondary"}
        size="xs"
      >
        <div className="ml-3 rotate-90 text-2xl">&#8250;</div>
        <img
          className="ml-2 h-10 w-10 rounded-full object-cover"
          src={session?.user.image ?? "/doctor.png"}
          alt="user"
        />
      </Button>

      <LoggedUserOptions
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
      />
    </div>
  );
};
