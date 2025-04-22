import { toast } from "react-hot-toast";

const blogPostApi = async (postData) => {
//  console.log('api Call',postData)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/blogPost-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        // console.log(response);

        if (response.ok) {
            console.log(response.status);
        }
        else {
            const responseData = await response.json();
            console.error(responseData);
            toast.error("Fetch error")
        }
    } catch (error) {
        console.error(error);
        toast.error("An error occurred:", error);
    }
    // toast.success('Thank Your Blogs')
};

export default blogPostApi;