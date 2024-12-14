import React, { useState } from "react";
import { api } from "../../../utils/api";
import { type Sex } from "@prisma/client";
import { InputBox } from "~/components/forms/InputBox";
import { InputLabel } from "~/components/forms/InputLabel";
import { Title } from "~/components/forms/Title";
import { Select } from "~/components/forms/Select";
import { Button } from "~/components/forms/Button";
import { Line } from "~/components/forms/Line";

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    pesel: "",
    sex: "MALE" as Sex,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerPatient = api.user.registerPatient.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, sex: e.target.value as Sex }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await registerPatient.mutateAsync(formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        pesel: "",
        sex: "MALE",
      });
    } catch (err) {
      setError("Failed to create account.");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl bg-default-white p-6">
      <Title>Create Account</Title>
      <Line />
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="text-sm text-red-500">{error}</div>}

        <div className="flex items-center space-x-4">
          <div className="form-group flex-grow-[1]">
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <InputBox
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group flex-grow-[1]">
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <InputBox
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

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

        <div className="form-group">
          <InputLabel htmlFor="pesel">PESEL</InputLabel>
          <InputBox
            type="text"
            id="pesel"
            name="pesel"
            value={formData.pesel}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <InputLabel htmlFor="sex">Sex</InputLabel>
          <Select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleSexChange}
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
              { value: "NON_BINARY", label: "Non binary" },
              { value: "OTHER", label: "Other" },
            ]}
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
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </div>
      </form>
    </div>
  );
};
