import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center border roudned p-3 shadow">
        <h1 className="text-lg font-bold">Welcome to Home Page</h1>
        <div className="flex flex-col">
          <Link to={"/otp-form"}>
            <a href="" className="text-blue-500 underline">
              OTP Form
            </a>
          </Link>
          <Link to={"/course-list"}>
            <a href="" className="text-blue-500 underline">
              Drag and drop box
            </a>
          </Link>
          <Link to={"/batches"}>
            <a href="" className="text-blue-500 underline">
              Data Table
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
