"use server";

export async function interestFormAction(
  initialState: object,
  formData: FormData,
) {
  console.log("Form data received:", formData);

  return { ...initialState, message: "Form submitted successfully!" };
}
