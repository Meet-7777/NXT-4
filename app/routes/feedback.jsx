import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import Navbar from "../components/Navbar";
import { insertDocument } from "../utils/db.server";
import { useEffect, useRef, useState } from "react";
import sanitize from "sanitize-html";

export const meta = () => [
  { title: "NXT4 - Feedback" },
  {
    name: "description",
    content: "Leave your valuable feedback for NXT4's services and products.",
  },
];

export const loader = () => {
  return json({ para: "We'd love your feedback!" });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = sanitize(formData.get("name"));
  const email = sanitize(formData.get("email"));
  const message = sanitize(formData.get("message"));

  const errors = {};
  if (!name || name.trim() === "") errors.name = "Name is required.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Valid email is required.";
  }
  if (!message || message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors, values: { name, email, message }, success: false }, { status: 400 });
  }

  try {
    await insertDocument("feedback", {
      name,
      email,
      message,
      createdAt: new Date(),
    });
    return json({ success: true });
  } catch (err) {
    console.error("Feedback submission error:", err);
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
};

export default function Feedback() {
  const { para } = useLoaderData();
  const actionData = useActionData();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {
    if (actionData) {
      setLoading(false);
      if (actionData.success) {
        setSubmitted(true);
        formRef.current?.reset();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [actionData]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        <section className="px-4 py-10 max-w-4xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-[#0E46A3] mb-4 text-center">
              We're All Ears
            </h2>
            <p className="text-gray-600 mb-6 text-center">{para}</p>

            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded mb-6 text-center">
                Thank you for your feedback! We appreciate your input.
              </div>
            )}

            {actionData?.errors?._form && (
              <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6 text-center">
                {actionData.errors._form}
              </div>
            )}

            <Form
              method="post"
              className="space-y-6"
              ref={formRef}
              onSubmit={() => setLoading(true)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={actionData?.values?.name || ""}
                  className={`mt-1 block w-full rounded-md border ${
                    actionData?.errors?.name ? "border-red-500" : "border-gray-300"
                  } shadow-sm p-2`}
                  placeholder="Walter White"
                />
                {actionData?.errors?.name && (
                  <p className="text-red-500 text-xs mt-1">{actionData.errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={actionData?.values?.email || ""}
                  className={`mt-1 block w-full rounded-md border ${
                    actionData?.errors?.email ? "border-red-500" : "border-gray-300"
                  } shadow-sm p-2`}
                  placeholder="walt@gmail.com"
                />
                {actionData?.errors?.email && (
                  <p className="text-red-500 text-xs mt-1">{actionData.errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  defaultValue={actionData?.values?.message || ""}
                  className={`mt-1 block w-full rounded-md border ${
                    actionData?.errors?.message ? "border-red-500" : "border-gray-300"
                  } shadow-sm p-2`}
                  placeholder="Write your message here..."
                />
                {actionData?.errors?.message && (
                  <p className="text-red-500 text-xs mt-1">{actionData.errors.message}</p>
                )}
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded-md text-white font-semibold transition-colors ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0E46A3] hover:bg-[#03346E]"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 p-4 mt-auto border-t border-gray-200 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-1 text-gray-600">© {year} NXT4. All rights reserved.</p>
          <p className="mb-2 text-gray-600">Proudly crafted in India ❤️</p>
        </div>
      </footer>
    </div>
  );
}
