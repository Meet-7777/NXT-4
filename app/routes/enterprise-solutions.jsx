import { useLoaderData, Form, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
import Navbar from "../components/navbar";
import { useState, useEffect, useRef } from "react";
import { insertDocument } from "../utils/db.server";

export const meta = () => {
  return [
    { title: "NXT4 - Enterprise Enquiry Form" },
    {
      name: "description",
      content:
        "Submit your business enquiry to NXT4 for hardware and lighting solutions.",
    },
  ];
};

export async function loader() {
  return json({
    title: "ENTERPRISE ENQUIRY",
    subtext:
      "If your enterprise is interested in our products, please fill out the form below. We will get back to you via email or phone.",
  });
}

export async function action({ request }) {
  const formData = await request.formData();

  const requiredFields = [
    "enterpriseName",
    "contactFirstName",
    "contactLastName",
    "phoneNumber",
    "email",
    "city",
    "stateProvince",
    "postalCode",
    "country",
  ];

  const errors = {};
  requiredFields.forEach((field) => {
    const value = formData.get(field);
    if (!value || value.trim() === "") {
      errors[field] = `${field} is required.`;
    }
  });

  const email = formData.get("email");
  const phone = formData.get("phoneNumber");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format.";
  }
  if (phone && !/^\d{10,15}$/.test(phone)) {
    errors.phoneNumber = "Phone number must be 10 to 15 digits.";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  const enterpriseData = {
    enterpriseName: formData.get("enterpriseName"),
    webSite: formData.get("webSite") || "",
    contactFirstName: formData.get("contactFirstName"),
    contactLastName: formData.get("contactLastName"),
    phoneNumber: phone,
    email: email,
    streetAddress: formData.get("streetAddress") || "",
    addressLine2: formData.get("addressLine2") || "",
    city: formData.get("city"),
    stateProvince: formData.get("stateProvince"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
    comments: formData.get("comments") || "",
    submittedAt: new Date(),
  };

  try {
    await insertDocument("enterpriseData", enterpriseData);
    return json({ success: true });
  } catch (error) {
    return json(
      {
        errors: {
          _form: "Something went wrong. Please try again.",
        },
      },
      { status: 500 }
    );
  }
}

export default function EnterpriseForm() {
  const { title, subtext } = useLoaderData();
  const actionData = useActionData();
  const date = new Date();
  const year = date.getFullYear();
  const formRef = useRef(null);

  useEffect(() => {
    if (actionData?.success && formRef.current) {
      formRef.current.reset();

      const inputs = formRef.current.querySelectorAll(
        "input, textarea, select"
      );
      inputs.forEach((input) => {
        input.value = "";
      });
    }
  }, [actionData?.success]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#0E46A3] text-white p-6 text-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="mt-2">{subtext}</p>
          </div>

          <div className="p-6">
            {actionData?.errors?._form && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {actionData.errors._form}
              </div>
            )}

            {actionData?.success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                Form submitted successfully! We'll be in touch soon.
              </div>
            )}

            <Form method="post" className="space-y-6" ref={formRef}>
              <div className="grid gap-4">
                <label className="block text-sm">
                  * Enterprise Name
                  <input
                    type="text"
                    name="enterpriseName"
                    className="mt-1 w-full border p-2 rounded-md"
                    required
                    defaultValue={actionData?.values?.enterpriseName || ""}
                  />
                  {actionData?.errors?.enterpriseName && (
                    <p className="text-red-500 text-sm">
                      {actionData.errors.enterpriseName}
                    </p>
                  )}
                </label>

                <label className="block text-sm">
                  Website (if applicable)
                  <input
                    type="text"
                    name="webSite"
                    className="mt-1 w-full border p-2 rounded-md"
                    defaultValue={actionData?.values?.webSite || ""}
                  />
                </label>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block text-sm">
                    * First Name
                    <input
                      type="text"
                      name="contactFirstName"
                      className="mt-1 w-full border p-2 rounded-md"
                      required
                      defaultValue={actionData?.values?.contactFirstName || ""}
                    />
                    {actionData?.errors?.contactFirstName && (
                      <p className="text-red-500 text-sm">
                        {actionData.errors.contactFirstName}
                      </p>
                    )}
                  </label>

                  <label className="block text-sm">
                    * Last Name
                    <input
                      type="text"
                      name="contactLastName"
                      className="mt-1 w-full border p-2 rounded-md"
                      required
                      defaultValue={actionData?.values?.contactLastName || ""}
                    />
                    {actionData?.errors?.contactLastName && (
                      <p className="text-red-500 text-sm">
                        {actionData.errors.contactLastName}
                      </p>
                    )}
                  </label>
                </div>

                <label className="block text-sm">
                  * Phone Number
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="mt-1 w-full border p-2 rounded-md"
                    required
                    defaultValue={actionData?.values?.phoneNumber || ""}
                  />
                  {actionData?.errors?.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {actionData.errors.phoneNumber}
                    </p>
                  )}
                </label>

                <label className="block text-sm">
                  * Email
                  <input
                    type="email"
                    name="email"
                    className="mt-1 w-full border p-2 rounded-md"
                    required
                    defaultValue={actionData?.values?.email || ""}
                  />
                  {actionData?.errors?.email && (
                    <p className="text-red-500 text-sm">
                      {actionData.errors.email}
                    </p>
                  )}
                </label>

                <label className="block text-sm">
                  Street Address
                  <input
                    type="text"
                    name="streetAddress"
                    className="mt-1 w-full border p-2 rounded-md"
                  />
                </label>

                <label className="block text-sm">
                  Address Line 2
                  <input
                    type="text"
                    name="addressLine2"
                    className="mt-1 w-full border p-2 rounded-md"
                  />
                </label>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block text-sm">
                    * City
                    <input
                      type="text"
                      name="city"
                      className="mt-1 w-full border p-2 rounded-md"
                      required
                    />
                  </label>
                  <label className="block text-sm">
                    * State / Province
                    <input
                      type="text"
                      name="stateProvince"
                      className="mt-1 w-full border p-2 rounded-md"
                      required
                    />
                  </label>
                </div>

                <label className="block text-sm">
                  * Postal Code
                  <input
                    type="text"
                    name="postalCode"
                    className="mt-1 w-full border p-2 rounded-md"
                    required
                  />
                </label>

                <label className="block text-sm">
                  * Country
                  <select
                    name="country"
                    className="mt-1 w-full border p-2 rounded-md"
                    required
                    defaultValue="India"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="block text-sm">
                  Comments
                  <textarea
                    name="comments"
                    rows="4"
                    className="mt-1 w-full border p-2 rounded-md"
                    placeholder="Any specific requests or questions?"
                  ></textarea>
                </label>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0E46A3] text-white font-medium rounded-md hover:bg-[#03346E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E46A3] transition-all"
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 p-4 mt-auto border-t border-gray-200 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-1 text-gray-600">
            © {year} NXT4. All rights reserved.
          </p>
          <p className="mb-2 text-gray-600">Proudly crafted in India ❤️</p>
        </div>
      </footer>
    </div>
  );
}
