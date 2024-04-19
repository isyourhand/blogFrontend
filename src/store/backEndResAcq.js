export const getPosts = async (
  hostName,
  lan,
  queryParams,
  setIsLoading,
  setloadedPosts
) => {
  console.log("haha,test success");

  fetch(`${hostName}/${lan}/api/post?${queryParams.toString()}`, {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data && data.data && data.data.posts) {
        console.log("posts data ->", data);
        if (typeof setIsLoading === "function") {
          setIsLoading(false);
        }
        if (typeof setloadedPosts === "function") {
          setloadedPosts(data);
        }
      } else {
        console.error("Ivalid data format:", data);
      }
    })
    .catch((err) => {
      if (typeof setIsLoading === "function") {
        setIsLoading(false);
      }
      console.log(err);
    });
};
