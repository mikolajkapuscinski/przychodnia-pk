import React, { useState } from "react";
import { Popover, PopoverPanel } from "@headlessui/react";
import { Button } from "../forms/Button";
import { Line } from "../forms/Line";
import { useSession, signOut } from "next-auth/react";
import { CustomDialog } from "../CustomDialog";
import { EditProfileForm } from "../forms/EditProfileForm";
import { ChangePasswordForm } from "../forms/ChangePasswordForm";
import { useRouter } from "next/router";

interface LoggedUserOptionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoggedUserOptions: React.FC<LoggedUserOptionsProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const [isChangePassOpen, setChangePassOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  const handleLogout = async () => {
    onClose();
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <>
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
                  onClick={() => setEditProfileOpen(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="secondary"
                  size="base"
                  className="flex w-full items-center justify-start"
                  onClick={() => setChangePassOpen(true)}
                >
                  Change Password
                </Button>

                <Button
                  variant="secondary"
                  size="base"
                  className="flex w-full items-center justify-start text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </div>
            </div>
          </PopoverPanel>
        )}
      </Popover>
      <CustomDialog
        isOpen={isEditProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      >
        <EditProfileForm></EditProfileForm>
      </CustomDialog>
      <CustomDialog
        isOpen={isChangePassOpen}
        onClose={() => setChangePassOpen(false)}
      >
        <ChangePasswordForm></ChangePasswordForm>
      </CustomDialog>
    </>
  );
};
