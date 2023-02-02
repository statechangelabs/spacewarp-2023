import { FC } from "react"
import { useAuthentication } from "./Authenticator"
import { Formik, Form, Field } from "formik"
import { Link } from "react-router-dom"
import Logo from "./Logo"
const Login: FC = () => {
    const { loginWithPassword, loginWithWallet } = useAuthentication()
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async ({ email, password }) => {
                await loginWithPassword(email, password)
            }}
        >
            {({ values, handleChange, handleBlur, submitForm, isValid, dirty, isSubmitting }) => (
                <Form>
                    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <Logo className="mx-auto h-12 w-12" />
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100">
                                Sign in to your account
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-200">
                                Or{" "}
                                <Link
                                    to="/signup"
                                    className="font-medium text-blue-200 hover:text-blue-100"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>

                        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                <div className="space-y-6">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
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
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
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
                                    </div>

                                    <div className="flex items-center justify-between">
                                        {/* <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div> */}

                                        {/* <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div> */}
                                    </div>

                                    <div>
                                        <button
                                            disabled={isSubmitting || !isValid || !dirty}
                                            type="button"
                                            onClick={submitForm}
                                            className={
                                                isSubmitting || !isValid || !dirty
                                                    ? "flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm"
                                                    : "flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            }
                                        >
                                            Sign in with Email and Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
export default Login
