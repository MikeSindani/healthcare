import { AdminRegistrationForm } from "@/components/forms/AdminRegistrationForm";
import Image from "next/image";

export default function AdminRegisterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/assets/icons/logo-full.svg"
          height={40}
          width={160}
          alt="Logo"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte administrateur
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AdminRegistrationForm />
        </div>
      </div>
    </div>
  );
}
