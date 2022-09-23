import React from "react";
import Layout from "../../components/Layout";
import RegisterForms from "../../components/RegisterForm/RegisterForms";
import useRegister from "../../hooks/use-register";

function Register() {
  const { postRegister } = useRegister();
  return (
    <div>
      <Layout title="Register">
        <RegisterForms postRegister={postRegister} />
      </Layout>
    </div>
  );
}

export default Register;
