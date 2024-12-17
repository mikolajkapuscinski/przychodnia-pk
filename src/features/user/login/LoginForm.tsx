import React, { useState } from "react";
import { InputBox } from "~/components/forms/InputBox";
import { InputLabel } from "~/components/forms/InputLabel";
import { Title } from "~/components/forms/Title";
import { Button } from "~/components/forms/Button";
import { Line } from "~/components/forms/Line";
import { signIn } from "next-auth/react";

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await signIn("credentials", {...formData, redirect: false});
      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      setError("Failed to login.");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto min-w-[400px] max-w-lg rounded-2xl bg-default-white p-6">
      <Title>LOGIN</Title>
      <Line />
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="text-sm text-red-500">{error}</div>}


        <div className="form-group">
          <InputLabel htmlFor="email">Email</InputLabel>
          <InputBox
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <InputLabel htmlFor="password">Password</InputLabel>
          <InputBox
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
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
            {isSubmitting ? "LOGIN..." : "LOGIN"}
          </Button>
        </div>
      </form>
    </div>
  );
};
