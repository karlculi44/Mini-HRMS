import jwt from "jsonwebtoken";
import { employeeList } from "../fixtures/mockEmployees";

const generateToken = (employeeId) => {
  const token = jwt.sign({ id: employeeId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export default generateToken;
