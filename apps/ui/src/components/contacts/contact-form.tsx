import type { ContactFormProps, ContactInput } from "@/types/contacts";
import { useEffect, useState } from "react";
import { Modal } from "../page-ui/modal";
import { Button } from "../page-ui/button";
import { Input } from "../page-ui/input";
import { Label } from "../page-ui/label";

export const ContactForm = ({
  isOpen,
  onClose,
  onSubmit,
  contact,
  isLoading = false,
}: ContactFormProps) => {
  // Initial state for formdata
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setEmail(contact.email);
      setPhone(contact.phone);
    }
  }, [contact, isOpen]);

  const resetFormData = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
  };

  const handleClose = () => {
    resetFormData();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill in all fields");
      return;
    }

    const contactData: ContactInput = {
      firstName,
      lastName,
      email,
      phone,
    };

    await onSubmit(contactData);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {/** close modal button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {contact ? "Edit Contact" : "Add New Contact"}
        </h2>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600"
        >
          X{" "}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="w-full justify-between flex gap-2 pt-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className={"bg-green-700 rounded-sm"}
            classes="flex-1 px-3 py-3 bg-slate-400 rounded-lg"
            text={"Cancel"}
          ></Button>
          <Button
            type="submit"
            disabled={isLoading}
            classes="flex-1 px-3 py-3 bg-green-600 text-white text-heavy rounded-lg"
            text={isLoading ? "Saving..." : contact ? "Update" : "Create"}
          ></Button>
        </div>
      </form>
    </Modal>
  );
};
