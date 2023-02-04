import { useParams } from "react-router-dom";
import { useAuthentication } from "./Authenticator";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { FC, useEffect } from "react";
import { toast } from "react-toastify";
import Logo from "./Logo";

const ChangePassword: FC = () => {
  const { key } = useParams();
  const { changePassword } = useAuthentication();
  useEffect(() => {
    if (!key) {
      navigate("/");
    }
  }, [key]);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: "", password: "", password2: "" }}
      onSubmit={async ({ password }) => {
        await changePassword(key!, password);
        toast("Password changed - log in again!", { type: "success" });
        navigate("/");
      }}
      validate={(values) => {
        const errors: Record<string, string> = {};
        if (values.password.length < 8) {
          errors["password"] = "Password must be at least 8 characters";
        }
        if (values.password !== values.password2) {
          errors["password2"] = "Passwords do not match";
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
                Change your password!
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="text-sm text-red-600 mt-2 ml-2 font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                      Retype the password
                    </label>
                    <div className="mt-1">
                      <Field
                        id="password2"
                        name="password2"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      name="password2"
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
                      Sign Up with Email and Password
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
export default ChangePassword;
