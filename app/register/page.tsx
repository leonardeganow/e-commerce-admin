import React from "react";
import { RegistrationForm } from "../components/RegistrationForm";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <RegistrationForm />
      </div>
    </div>
  );
}
