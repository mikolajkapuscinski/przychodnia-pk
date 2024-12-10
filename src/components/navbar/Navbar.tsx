import { Logo } from "./Logo";
import { NavButtons } from "./NavButtons";
import { Utilities } from "./Utilities";

export const Navbar: React.FC = () => {
  return (
    <div className="flex max-h-16 w-full items-stretch justify-between py-1">
      <div className="w-1/3">
        <Logo />
      </div>
      <NavButtons />
      <Utilities />
    </div>
  );
};
