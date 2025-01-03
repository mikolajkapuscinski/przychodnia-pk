import React from "react";
import { Transition, Dialog, DialogPanel } from "@headlessui/react";
import { Button } from "./forms/Button";

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          aria-hidden="true"
        />
        {/* Dialog Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            className={`dialog-scrollbar relative rounded-lg bg-default-white p-6 shadow-xl ${className}`}
            style={{
              maxHeight: "calc(100vh - 1rem)",
              overflowY: "auto",
            }}
          >
            {/* Close Button */}
            <Button
              onClick={onClose}
              className="absolute right-4 top-4"
              variant={"secondary"}
              size={"xs"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>

            {/* Dialog Content */}
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};
