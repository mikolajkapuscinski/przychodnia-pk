import React, { useState, useEffect } from "react";
import { InputBox } from "~/components/forms/InputBox";
import { InputLabel } from "~/components/forms/InputLabel";
import { type Sex } from "@prisma/client";
import { Title } from "~/components/forms/Title";
import { Button } from "~/components/forms/Button";
import { Line } from "~/components/forms/Line";
import { useSession } from "next-auth/react";
import { Select } from "./Select";
import { api } from "~/utils/api";

export const EditProfileForm: React.FC = () => {
  const userId = useSession().data?.user.id;
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    sex: "MALE" as Sex,
  });

  const user = api.user.findById.useQuery({ id: userId || "" }).data;

  useEffect(() => {
    if (user) {
      setFormData({
        id: userId || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        sex: user.sex,
      });
    }
  }, [user, userId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateUserMutation = api.user.updateUserData.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, sex: e.target.value as Sex }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill out all required fields");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Invalid email address");
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await updateUserMutation.mutateAsync(formData);
      setSuccess("Profile updated")
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto min-w-[400px] max-w-lg rounded-2xl bg-default-white p-6">
      <Title>EDIT PROFILE</Title>
      <Line />
      <form onSubmit={onSubmit} className="space-y-4">

        {error && <div className="text-sm text-red-500">{error}</div>}
        {success && <div className="text-sm text-green-500">{success}</div>}

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

        <div className="form-group flex-grow-[1]">
          <InputLabel htmlFor="address">Address</InputLabel>
          <InputBox
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group flex-grow-[1]">
          <InputLabel htmlFor="phoneNumber">Phone number</InputLabel>
          <InputBox
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
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
          />
        </div>

        <div className="form-group pt-5">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            size="base"
          >
            {isSubmitting ? "SENDING..." : "EDIT DATA"}
          </Button>
        </div>
      </form>
    </div>
  );
};
