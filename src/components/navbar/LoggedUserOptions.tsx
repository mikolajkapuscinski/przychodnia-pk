import React from "react";
import { Popover, PopoverPanel } from "@headlessui/react";
import { Button } from "../forms/Button";
import { Line } from "../forms/Line";
import { useSession, signOut } from "next-auth/react";

interface LoggedUserOptionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoggedUserOptions: React.FC<LoggedUserOptionsProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: sessionData } = useSession();
  return (
    <Popover as="div" className="relative z-50">
      {isOpen && (
        <PopoverPanel
          static
          className="absolute right-0 mt-10 w-64 rounded-lg bg-white shadow-xl"
        >
          <div className="relative">
            <div className="absolute -top-2 right-10 h-4 w-4 rotate-45 transform bg-white"></div>

            <div className="p-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {sessionData?.user?.name ?? "Mariusz Rynkiewicz"}
                </h3>
                <p className="text-sm text-gray-500">
                  {sessionData?.user?.email ?? "mariusz@rynkiewicz.com"}
                </p>
              </div>

              <Line />

              <Button
                variant="secondary"
                size="base"
                className="flex w-full items-center justify-start"
                onClick={onClose}
              >
                My Profile
              </Button>

              <Button
                variant="secondary"
                size="base"
                className="flex w-full items-center justify-start"
                onClick={onClose}
              >
                Edit Profile
              </Button>

              <Button
                variant="secondary"
                size="base"
                className="flex w-full items-center justify-start text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => {
                  onClose();
                  signOut();
                }}
              >
                Log Out
              </Button>
            </div>
          </div>
        </PopoverPanel>
      )}
    </Popover>
  );
};
