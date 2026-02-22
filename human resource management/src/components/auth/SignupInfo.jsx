const SignupInfo = () => (
  <div className="w-1/2 relative flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
    <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full blur-3xl top-10 left-10"></div>
    <div className="absolute w-72 h-72 bg-pink-400 opacity-10 rounded-full blur-3xl bottom-10 right-10"></div>

    <div className="relative z-10 max-w-md text-center space-y-6 px-8">
      <h1 className="text-4xl font-bold leading-tight">Join Our HRM 🚀</h1>
      <p className="text-lg opacity-90">
        Create your account and start managing employees, payroll, and departments with confidence.
      </p>
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
          <p className="text-2xl font-bold">Secure</p>
          <p className="opacity-80">Role-Based Access</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
          <p className="text-2xl font-bold">Smart</p>
          <p className="opacity-80">Payroll Automation</p>
        </div>
      </div>
      <p className="text-sm opacity-70 mt-6">Designed for modern organizations</p>
    </div>
  </div>
);

export default SignupInfo;