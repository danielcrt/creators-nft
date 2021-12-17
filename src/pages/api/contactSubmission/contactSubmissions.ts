import { ContactForm } from "../../../types";
import { ApiResponse } from "../../../types/ApiResponse";
import api from "../api";
import resolve from "../utils/resolve";

const resourceUrl = 'contact-submissions';

export const createContactSubmission = async (parameters: ContactForm): Promise<ApiResponse<ContactForm>> => {
  return await resolve(api.post(resourceUrl, parameters).then(res => res.data));
}