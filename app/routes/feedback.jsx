import { json, redirect } from "@remix-run/node";
import {
  useLoaderData,
  Form,
  useActionData,
  useSearchParams,
} from "@remix-run/react";
import Navbar from "../components/navbar";
import { insertDocument, findDocuments } from "../utils/db.server";
import { useEffect, useRef } from "react";
export const meta = () => {
  return [
    { title: "NXT4 - Feedback" },
    {
      name: "description",
      content: "Feedback Form For NXT4",
    },
  ];
};

export const loader = () => {
  return json({
    para: "We'd love your feedback!",
  });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const errors = {};
  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";
  if (!message) errors.message = "Message is required";
  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  try {
    const feedback = {
      name,
      email,
      message,
      createdAt: new Date(),
    };

    const result = await insertDocument("feedback", feedback);
    const docs = await findDocuments("feedback");

    return redirect("/feedback?success=true");
  } catch (error) {
    return json(
      {
        errors: {
          _form: `Error: ${error.message}`,
        },
      },
      { status: 500 }
    );
  }
};

export default function Feedback() {
  const data = useLoaderData();
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const formRef = useRef(null);
  useEffect(() => {
    if (success && formRef.current) {
      formRef.current.reset();

      const inputs = formRef.current.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.value = "";
      });
    }
  }, [success]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="px-4 py-8 max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl text-[#0E46A3] mb-4 text-center">
              We're All Ears
            </h2>
            <p className="text-gray-600 mb-8 text-center">{data.para}</p>

            {success ? (
              <div className="bg-green-50 border border-green-400 text-green-700 p-4 rounded mb-6">
                <p className="text-center">
                  Thank you for your feedback! We appreciate your input.
                </p>
              </div>
            ) : null}

            {actionData?.errors?._form ? (
              <div className="bg-red-50 border border-red-400 text-red-700 p-4 rounded mb-6">
                <p className="text-center">{actionData.errors._form}</p>
              </div>
            ) : null}

            <Form method="post" className="space-y-6" ref={formRef}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className={`mt-1 block w-full rounded-md border ${
                    actionData?.errors?.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } shadow-sm focus:ring-[#0E46A3] focus:border-[#0E46A3] sm:text-sm p-2`}
                  placeholder="John Doe"
                />
                {actionData?.errors?.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {actionData.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className={`mt-1 block w-full rounded-md border ${
                    actionData?.errors?.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } shadow-sm focus:ring-[#0E46A3] focus:border-[#0E46A3] sm:text-sm p-2`}
                  placeholder="john@example.com"
                />
                {actionData?.errors?.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {actionData.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  required
                  className={`mt-1 block w-full rounded-md border ${
                    actionData?.errors?.message
                      ? "border-red-500"
                      : "border-gray-300"
                  } shadow-sm focus:ring-[#0E46A3] focus:border-[#0E46A3] sm:text-sm p-2`}
                  placeholder="Write your message here..."
                />
                {actionData?.errors?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {actionData.errors.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-[#0E46A3] hover:bg-[#03346E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E46A3] transition-colors duration-200"
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 p-4 mt-auto border-t border-gray-200 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-1 text-gray-600">
            © 2025 NXT4. All rights reserved.
          </p>
          <p className="mb-3 text-gray-600">Proudly crafted in India ❤️</p>
        </div>
      </footer>
    </div>
  );
}
