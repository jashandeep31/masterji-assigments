import { useRef, useState } from "react";

const OTPForm = () => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const otpRef = useRef<(HTMLInputElement | null)[]>([]);
  const [formState, setformState] = useState<null | "success" | "failed">(null);

  const handleInputValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    // reseting form state
    if (formState) {
      setformState(null);
    }

    setOtp((prev) => {
      const newOTP = [...prev];
      let i = index;
      for (const digit of value) {
        if (i < newOTP.length) {
          newOTP[i] = digit;
        }
        i++;
      }
      return newOTP;
    });

    if (value.length > 1) {
      const nextIndex = index + value.length;
      if (nextIndex < otpRef.current.length) {
        otpRef.current[nextIndex]?.focus();
      }
    } else if (value.length === 1 && index < otp.length - 1) {
      otpRef.current[index + 1]?.focus();
    }
  };
  const handleKeyboardEvent = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0) {
      if (otp[index].length === 1) {
        setOtp((prev) => {
          const newOTP = [...prev];
          newOTP[index] = "";
          return newOTP;
        });
      } else {
        otpRef.current[index - 1]?.focus();
        setOtp((prev) => {
          const newOTP = [...prev];
          newOTP[index - 1] = "";
          return newOTP;
        });
      }
    }
    // handling the arrow keys to move back and fro
  };

  const handleOTPSubmit = () => {
    if (otp.join("") === "1234") {
      setformState("success");
    } else {
      setformState("failed");
    }
  };

  const SubmitButton = () => {
    if (formState === "success") {
      return (
        <button
          className=" text-white py-3 px-4 rounded  w-full  bg-green-500"
          onClick={handleOTPSubmit}
        >
          Verified
        </button>
      );
    } else if (formState === "failed") {
      return (
        <button
          className=" text-white py-3 px-4 rounded  w-full bg-red-500  "
          onClick={handleOTPSubmit}
        >
          Verification Failed
        </button>
      );
    } else {
      return (
        <button
          className=" text-white py-3 px-4 rounded  w-full  bg-[#112D4E]"
          onClick={handleOTPSubmit}
        >
          Verify Account
        </button>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3F72AF] px-4">
      <div className="flex-col flex gap-12 w-full items-center ">
        <h1 className="text-5xl  font-bold text-center text-white">
          Chai aur Code
        </h1>
        <div className="bg-white rounded-md py-5 md:w-1/4 flex flex-col items-center ">
          <h2 className="text-2xl mb-4 font-bold">Mobile Verification OTP</h2>
          <p className="text-center text-slate-500 text-sm">
            Enter the 4-digit verification code that was sent to your phone
            number
          </p>

          <div className="flex flex-col items-center gap-4 my-6">
            <div className="flex  gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => (otpRef.current[index] = ref)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputValueChange(e, index)
                  }
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleKeyboardEvent(e, index)
                  }
                  value={digit}
                  type="number"
                  className={`bg-slate-200 border rounded w-12 h-12  text-center${
                    formState === "success" ? " border-green-400 " : ""
                  } ${
                    formState === "failed" ? " border-red-500 " : ""
                  }  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
              ))}
            </div>
            <div className="w-full">
              <SubmitButton />
            </div>
          </div>
          <p className="text-slate-500">
            Didn't receive OTP?{" "}
            <a href="" className="text-[#112D4E]">
              Resend
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
