import React, { useState } from "react";
import { InputBox } from "~/components/forms/InputBox";
import { InputLabel } from "~/components/forms/InputLabel";
import { Title } from "~/components/forms/Title";
import { Button } from "~/components/forms/Button";
import { Line } from "~/components/forms/Line";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";

export const ChangePasswordForm: React.FC = () => {
  const session = useSession();
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = api.user.updateUserPassword.useMutation();

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleCurrentPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentPassword(value);
  };


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!session.data?.user.id) {
        throw new Error("User ID is undefined");
      }
        await changePassword.mutateAsync({
          id: session.data?.user.id,
          currentPassword: currentPassword,
          newPassword: password
        });
    } catch (err) {
      setError("Failed to change a password.");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto min-w-[400px] max-w-lg rounded-2xl bg-default-white p-6">
      <Title>CHANGE PASSWORD</Title>
      <Line />
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="text-sm text-red-500">{error}</div>}

        <div className="form-group">
          <InputLabel htmlFor="password">Current Password</InputLabel>
          <InputBox
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={handleCurrentPassChange}
            required
          />
        </div>

        <div className="form-group">
          <InputLabel htmlFor="password">New Password</InputLabel>
          <InputBox
            type="password"
            id="newPassword"
            name="newPassword"
            value={password}
            onChange={handlePassChange}
            required
          />
        </div>

        <div className="form-group pt-5">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            size="base"
          >
            {isSubmitting ? "CHANGING..." : "CHANGE"}
          </Button>
        </div>
      </form>
    </div>
  );
};
