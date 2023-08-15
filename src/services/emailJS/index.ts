import { AxiosRequestConfig } from "axios";

export const sendEmailToUser = (
  userEmail: string[],
  userName: string,
  todoName: string,
  todoDescription: string
): AxiosRequestConfig => ({
  url: "https://api.emailjs.com/api/v1.0/email/send",
  method: "POST",
  data: {
    service_id: "service_txls08s",
    template_id: "template_5s2flzq",
    user_id: "u7GvwqEB_-Qra9RJY",
    template_params: {
      to_name: userName,
      "g-recaptcha-response": "03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...",
      from_name: "Organizely Todo App",
      todo_title: todoName,
      todo_description: todoDescription,
      to: userEmail,
    },
  },
});
