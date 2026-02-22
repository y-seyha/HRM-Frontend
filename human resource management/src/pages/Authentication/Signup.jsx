import SignupForm from "../../components/auth/SignupForm";
import SignupInfo from "../../components/auth/SignupInfo";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[1100px] h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        <div className="w-1/2 flex items-center justify-center bg-gray-50 p-10">
          <SignupForm />
        </div>
        <SignupInfo />
      </div>
    </div>
  );
};

export default Signup;
