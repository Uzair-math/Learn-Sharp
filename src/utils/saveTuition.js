import { toast } from "react-hot-toast";

const saveTuition = async (tuitionData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tuitions/postTuitions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tuitionData), // Stringify the object
    });
    // console.log(response);


    if (response.ok) {
      toast.success("Tuition added successfully");
    } 
  } catch (error) {
    toast.error("An error occurred: " + error.message);
  }
};

export default saveTuition;
