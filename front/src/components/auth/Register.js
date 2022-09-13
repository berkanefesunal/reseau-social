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
import { useFormik } from "formik";
import * as Yup from "yup";
import { userRegister } from "api/api";
import { UserContext } from "context/UserContext";
const Register = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const { setUser } = React.useContext(UserContext);
  const { handleChange, handleSubmit, touched, errors, handleBlur } = useFormik(
    {
      initialValues: {
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(5),
        confirmPassword: Yup.string()
          .required()
          .oneOf([Yup.ref("password"), null], "Passwords are not matched!"),
      }),
      onSubmit: async (values) => {
        setIsLoading(true);
        const data = {
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: values.password,
        };

        try {
          const res = await userRegister(data);

          if (res.status === 200) {
            toast({
              status: "success",
              title: "Success",
              description: "You are successfully registered",
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
                <h4 className={style.auth_title_text}>Register</h4>
              </div>
              <div className={style.auth_form}>
                <div className={style.auth_form}>
                  <form onSubmitCapture={handleSubmit}>
                    <FormControl marginY={4}>
                      <Input
                        onChange={handleChange}
                        isInvalid={touched.name && errors.name}
                        onBlur={handleBlur}
                        height={50}
                        type="text"
                        placeholder="Name"
                        name="name"
                      />
                      {touched.name && errors.name && (
                        <FormHelperText color="red">
                          {" "}
                          {errors.name}{" "}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl marginY={4}>
                      <Input
                        onChange={handleChange}
                        isInvalid={touched.surname && errors.surname}
                        onBlur={handleBlur}
                        height={50}
                        type="text"
                        placeholder="Surname"
                        name="surname"
                      />
                      {touched.surname && errors.surname && (
                        <FormHelperText color="red">
                          {" "}
                          {errors.surname}{" "}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl marginY={4}>
                      <Input
                        onChange={handleChange}
                        isInvalid={touched.email && errors.email}
                        onBlur={handleBlur}
                        height={50}
                        type="email"
                        placeholder="Email"
                        name="email"
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
                        height={50}
                        onChange={handleChange}
                        isInvalid={touched.password && errors.password}
                        onBlur={handleBlur}
                        name="password"
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
                    <FormControl marginY={4}>
                      <Input
                        onChange={handleChange}
                        isInvalid={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        onBlur={handleBlur}
                        height={50}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <FormHelperText color="red">
                          {" "}
                          {errors.confirmPassword}{" "}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <Button
                      width="100%"
                      type="submit"
                      onSubmit={handleSubmit}
                      colorScheme="green"
                      size="md"
                      marginY={4}
                      isLoading={isLoading}
                    >
                      Register
                    </Button>
                  </form>
                </div>
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

export default Register;
