import React, { FC } from "react";
import { useAuthentication } from "./Authenticator";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { validate as validateEmail } from "email-validator";
import { toast } from "react-toastify";
const ResetPassword: FC = () => {
  const { resetPassword } = useAuthentication();
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async ({ email }, helpers) => {
        helpers.setSubmitting(true);
        await resetPassword(email);
        toast("Check your email for a password reset link");
        helpers.setSubmitting(false);
        helpers.resetForm();
      }}
      validate={(values) => {
        const errors: Record<string, string> = {};
        if (!validateEmail(values.email)) {
          errors["email"] = "Invalid email";
        }

        if (Object.entries(errors).length > 0) {
          return errors;
        }
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        submitForm,
        errors,
        isValid,
        isValidating,
        isSubmitting,
        dirty,
      }) => (
        <Form>
          <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <Logo className="mx-auto h-12 w-12" />

              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100">
                Reset your password
              </h2>
              <p className="mt-2 text-center text-sm text-gray-200">
                Or{" "}
                <Link to="/" className="font-medium text-blue-200 hover:text-blue-100">
                  Log in to your account
                </Link>
              </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="text-sm text-red-600 mt-2 ml-2 font-medium"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    {/* <div className="text-sm">
                        <Link
                          href="/forgot-password"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot your password?
                        </Link>
                      </div> */}
                  </div>

                  <div>
                    <button
                      disabled={!dirty || !isValid || isSubmitting}
                      type="button"
                      onClick={submitForm}
                      className={
                        "flex w-full justify-center rounded-md border border-transparent " +
                        (!isValid || isSubmitting || !dirty
                          ? " bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm "
                          : " bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2")
                      }
                    >
                      Request a password reset email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
