import { useNavigate } from "react-router-dom";  
import { Form, Input, Button, message } from "antd";
import { registerUser } from "../api"; 

const Mainform = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();  

  const handleSubmit = async (values) => {
    try {
      const response = await registerUser({
        name: values.name,
        mobile: values.mobile,
        username: values.userId,
        email: values.email,
        password: values.password,
      });
  
      console.log("API Response:", response.data);
  
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token stored:", response.data.token);
      } else {
        console.error("Token missing from response");
      }
  
      message.success("User registered successfully!");
      navigate("/login");
  
      form.resetFields();
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err);
      message.error("An error occurred. Please try again.");
    }
  };
  

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h2>Register</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobile"
          rules={[
            { required: true, message: "Please enter your mobile number" },
            { pattern: /^[0-9]{10}$/, message: "Enter a valid 10-digit mobile number" },
          ]}
        >
          <Input placeholder="Enter your mobile number" />
        </Form.Item>

        <Form.Item label="User ID" name="userId" rules={[{ required: true, message: "Please enter your user ID" }]}>
          <Input placeholder="Enter your user ID" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Confirm Email"
          name="confirmEmail"
          dependencies={["email"]}
          rules={[
            { required: true, message: "Please confirm your email" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("email") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Emails do not match!"));
              },
            }),
          ]}
        >
          <Input placeholder="Confirm your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit details
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Mainform;
