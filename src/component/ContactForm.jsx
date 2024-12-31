import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ContactForm() {

    const formik = useFormik({
        initialValues: {
          name: '', 
          email: '', 
          phone: '', 
          message: '', 
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required!'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required!'), 
            phone: Yup.string()
                .min(10, 'Must be 10 number digit')
                .max(10, 'Must be 10 number digit')
                .matches(/^\d+$/, 'Must be a number')
                .required('Required!'), 
        }),

        onSubmit: (values, { resetForm }) => {
          console.log('Form data:', values)
          alert('Form submitted successfully!')
          setTimeout(() => {
            resetForm()
          }, 1000) // Task: Optionally, handle the form submission with a mock API call (using `setTimeout` for simulation).
        }
      })
    
    return (
        <div className="contact-form-container">
          <h1>Contact Us</h1>
          <form onSubmit = {formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name"> Name: </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                {...formik.getFieldProps('name')}
              />
                {formik.touched.name && formik.errors.name ? (
                    <div className="error">{formik.errors.name}</div>
                ) : null}
            </div>
    
            <div className="form-group">
              <label htmlFor="email"> Email: </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email ID"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
                ) : null} 
            </div>
    
            <div className="form-group">
              <label htmlFor="phone"> Phone: </label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter your phone number"
                {...formik.getFieldProps('phone')}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error">{formik.errors.phone}</div>
              ) : null} 
            </div>
    
            <div className="form-group">
              <label htmlFor="message"> Message </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              ></textarea>
            </div>
    
            <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
              Submit
            </button> 
          </form>
        </div>
      )
}