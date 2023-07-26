import { redirect } from "react-router-dom";

export const action = () => {
  console.log("Logging out...");
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  
  return redirect("/");
};
