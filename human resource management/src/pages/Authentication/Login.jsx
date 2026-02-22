import LoginForm from "../../components/auth/LoginForm";
import LoginInfo from "../../components/auth/LoginInfo";

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-[1100px] h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
      <div className="w-1/2 flex items-center justify-center bg-gray-50 p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Login to HRM System
          </h2>
          <LoginForm />
        </div>
      </div>

      <LoginInfo />
    </div>
  </div>
);

export default Login;
