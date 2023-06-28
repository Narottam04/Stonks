import React, { useRef, useState } from "react";
import * as Yup from "yup";
import ErrorToast from "../Components/ErrorToast";
import { Field, Form, Formik } from "formik";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router";

const initialValues = {
  title: "",
  body: ""
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title cannot be empty..."),
  body: Yup.string().required("Add a description of the topic...")
});

const SocialPost = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [submitPost, setSubmitPost] = useState(false);
  const toastRef = useRef();

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  async function onSubmit(values, onSubmitProps) {
    try {
      setSubmitPost(true);
      const { title, body } = values;

      const res = await fetch("https://api-6tyd64odzq-uc.a.run.app/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          body,
          userId: currentUser?.uid
        })
      });

      const postDetails = await res.json();
      console.log("submit post", postDetails);

      if (postDetails.hasOwnProperty("message")) {
        throw new Error(postDetails?.message);
      }

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      setSubmitPost(false);
      navigate("/app/social");
    } catch (error) {
      setSubmitPost(false);
      setErrorMessage(error.message);
      toastRef.current.show();
    }
  }
  return (
    <section className="lg:px-4 py-2 lg:py-8  max-w-[1600px]">
      <ErrorToast message={errorMessage} ref={toastRef} />

      <p className="text-white font-bold text-2xl md:text-3xl font-title pt-6 md:pt-0 mb-4 ml-3 px-2 md:px-4">
        Submit A New Post
      </p>
      <div className="bg-[#1a1a1b] p-8 mx-6">
        {/* form */}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnMount
        >
          {(formik) => (
            <Form autoComplete="off">
              <div className="mb-6">
                <label
                  for="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  required
                  className="border  text-sm rounded-lg  block w-full p-2.5 bg-[#1a1a1b] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Title of the post..."
                />
              </div>
              <div className="">
                <label
                  for="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <Field
                  id="body"
                  name="body"
                  as="textarea"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.body}
                  required
                  rows="4"
                  className="block p-2.5 w-full text-sm rounded-lg border bg-[#1a1a1b] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Leave a comment..."
                ></Field>
              </div>
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="text-white mt-8 w-full font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
              >
                {formik.isSubmitting || submitPost ? "Submitting Your Post..." : "Submit Post"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SocialPost;
