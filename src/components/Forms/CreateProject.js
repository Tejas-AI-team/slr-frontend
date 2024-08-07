import React from "react";
import { useFormik } from "formik";
import { createProjectSchema } from "../../schema/schema";
import { api } from "util/api";
import { fetchProjectsData } from "../../redux/slices/projectSlice";
import { useDispatch } from "react-redux";
import { notify } from "components/Notify/Notify";
// components
const initialValues = {
  projectName: "",
  projectDescription: "",
};

export default function CreateProject() {
  const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: createProjectSchema,
      onSubmit: (values, action) => {
        api
          .post(
            "project",
            {
              projectName: values.projectName.trim(),
              projectDescription: values.projectDescription.trim(),
            },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            notify(response.data.detail, "success");
            if (response.status === 200) {
              dispatch(fetchProjectsData());
            }
            return response;
          })
          .catch((error) => {
            console.log(error);
            notify(error.response.data.detail, "error");
          });
        action.resetForm();
      },
    });

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Create Project
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Project Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="projectName"
                  >
                    Project Name
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring ${
                      errors.projectName
                        ? "focus:ring-red-300"
                        : "focus:ring-blueGray-300"
                    }`}
                    placeholder="Enter project name"
                    name="projectName"
                    value={values.projectName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.projectName && touched.projectName && (
                    <p className="text-xs text-red-500 float-right bg-red-100 p-1">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      {errors.projectName}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="projectDescription"
                  >
                    Description
                  </label>
                  <textarea
                    id="projectDescription"
                    type="text"
                    className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 focus:ring ${
                      errors.projectDescription
                        ? "focus:ring-red-300"
                        : "focus:ring-blueGray-300"
                    }`}
                    placeholder="Enter project description."
                    rows="4"
                    name="projectDescription"
                    value={values.projectDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
                  {errors.projectDescription && touched.projectDescription && (
                    <p className="text-xs text-red-500 float-right bg-red-100 p-1">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      {errors.projectDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Create Project
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
