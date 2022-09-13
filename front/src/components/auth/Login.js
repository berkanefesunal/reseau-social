import React from "react";
import style from "./style/auth.module.css";
import logo from "../header/assets/logo.svg";
import {
  FormControl,
  Button,
  Input,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userLogin } from "api/api";
import { UserContext } from "context/UserContext";
const Login = () => {
  const { setUser } = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const { handleSubmit, handleChange, handleBlur, errors, touched } = useFormik(
    {
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      }),
      onSubmit: async (values) => {
        setIsLoading(true);
        try {
          const data = {
            email: values.email,
            password: values.password,
          };
          const res = await userLogin(data);
          if (res.status === 200) {
            toast({
              status: "success",
              title: "Success",
              description: "You are successfully logged in.",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
            localStorage.setItem("access-token", res.data.accessToken);
            localStorage.setItem("refresh-token", res.data.refreshToken);
            setUser(res.data.user);
          }
        } catch (err) {
          const errMessage = err.response.data.message;

          toast({
            status: "error",
            title: "Error",
            description: errMessage,
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
        setIsLoading(false);
      },
    }
  );

  return (
    <section className={style.auth}>
      <div className="container">
        <div className={style.auth_wrapper}>
          <div className={style.auth_body}>
            <div className={style.auth_content}>
              <div className={style.auth_title}>
                <img src={logo} alt="logo" className="img-fluid m-auto mb-3" />
                <h4 className={style.auth_title_text}> Login</h4>
              </div>
              <div className={style.auth_form}>
                <form onSubmitCapture={handleSubmit}>
                  <FormControl marginY={4}>
                    <Input
                      isInvalid={errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="email"
                      height={50}
                      type="email"
                      placeholder="Email"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText color="red">
                        {" "}
                        {errors.email}{" "}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl marginY={4}>
                    <Input
                      isInvalid={touched.password && errors.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="password"
                      height={50}
                      type="password"
                      placeholder="Password"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText color="red">
                        {" "}
                        {errors.password}{" "}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Button
                    width="100%"
                    onSubmit={handleSubmit}
                    type="submit"
                    colorScheme="green"
                    size="md"
                    marginY={4}
                    isLoading={isLoading}
                  >
                    Login
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.auth_bg}>
        <div className={style.auth_bg_fade}></div>
      </div>
    </section>
  );
};

export default Login;
