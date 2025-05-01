import { useLoaderData, Form, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useState, useEffect, useRef } from "react";
import { insertDocument } from "../utils/db.server";
import sanitize from "sanitize-html";

export const meta = () => [
  { title: "NXT4 - Enterprise Enquiry Form" },
  {
    name: "description",
    content:
      "Submit your business enquiry to NXT4 for hardware and lighting solutions.",
  },
];

export async function loader() {
  return json({
    title: "ENTERPRISE ENQUIRY",
    subtext:
      "If your enterprise is interested in our products, please fill out the form below. We will get back to you via email or phone.",
  });
}

export async function action({ request }) {
  const formData = await request.formData();

  const sanitizeField = (field) => sanitize(formData.get(field) || "").trim();

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

  const values = {};
  const errors = {};

  for (const field of requiredFields) {
    values[field] = sanitizeField(field);
    if (!values[field]) {
      errors[field] = `${field} is required.`;
    }
  }

  values.webSite = sanitizeField("webSite");
  values.streetAddress = sanitizeField("streetAddress");
  values.addressLine2 = sanitizeField("addressLine2");
  values.comments = sanitizeField("comments");

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email format.";
  }

  if (values.phoneNumber && !/^\d{10,15}$/.test(values.phoneNumber)) {
    errors.phoneNumber = "Phone number must be 10 to 15 digits.";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors, values, success: false }, { status: 400 });
  }

  try {
    await insertDocument("enterpriseData", {
      ...values,
      submittedAt: new Date(),
    });
    return json({ success: true });
  } catch (err) {
    console.error("Enterprise form error:", err);
    return json(
      {
        errors: {
          _form: "Something went wrong. Please try again later.",
        },
        success: false,
      },
      { status: 500 }
    );
  }
}

export default function EnterpriseForm() {
  const { title, subtext } = useLoaderData();
  const actionData = useActionData();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (actionData) {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (actionData.success) {
        formRef.current?.reset();
        setSubmitted(true);
      }
    }
  }, [actionData]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#0E46A3] text-white p-6 text-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="mt-2">{subtext}</p>
          </div>

          <div className="p-6">
            {submitted && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                Form submitted successfully! We'll be in touch soon.
              </div>
            )}

            {actionData?.errors?._form && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {actionData.errors._form}
              </div>
            )}

            <Form
              method="post"
              className="space-y-6"
              ref={formRef}
              onSubmit={() => setLoading(true)}
            >
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
                    defaultValue={actionData?.values?.streetAddress || ""}
                  />
                </label>

                <label className="block text-sm">
                  Address Line 2
                  <input
                    type="text"
                    name="addressLine2"
                    className="mt-1 w-full border p-2 rounded-md"
                    defaultValue={actionData?.values?.addressLine2 || ""}
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
                      defaultValue={actionData?.values?.city || ""}
                    />
                  </label>
                  <label className="block text-sm">
                    * State / Province
                    <input
                      type="text"
                      name="stateProvince"
                      className="mt-1 w-full border p-2 rounded-md"
                      required
                      defaultValue={actionData?.values?.stateProvince || ""}
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
                    defaultValue={actionData?.values?.postalCode || ""}
                  />
                </label>

                <label className="block text-sm">
                  * Country
                  <select
                    name="country"
                    className="mt-1 w-full border p-2 rounded-md"
                    required
                    defaultValue={actionData?.values?.country || "India"}
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
                    defaultValue={actionData?.values?.comments || ""}
                    placeholder="Any specific requests or questions?"
                  ></textarea>
                </label>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 font-medium rounded-md transition-all ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-[#0E46A3] hover:bg-[#03346E] text-white"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit"}
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
