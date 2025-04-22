import useAuth from "@/hooks/useAuth";
// import createJWT from "@/utils/createJWT";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = ({ from }) => {
  const { signInWithGoogle } = useAuth();
  const { replace, refresh } = useRouter();

  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const { user } = await signInWithGoogle();
    //   await createJWT({ email: user.email });
      startTransition(() => {
        refresh();
        replace(from);
        toast.dismiss(toastId);
        toast.success("User signed in successfully");
      });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "User not signed in");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="btn bg-gradient-to-br from-teal-500 to-teal-700 ring-2 ring-offset-1 ring-teal-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-semibold rounded-lg mt-5 mx-auto"
    >
      <FcGoogle className="text-3xl mr-3" /> Continue with google
    </button>
  );
};

export default GoogleLogin;