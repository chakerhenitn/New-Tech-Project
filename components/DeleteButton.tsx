"use client";

export default function DeleteButton({ id }: { id: string }) {
  //function to delete image from cloudinary when deleting a post
  const deleteImageWhenDeletePost = async (publicId: string) => {
    const res = await fetch("/api/removeImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
  };

  //Create the delete handle function
  const handleDelete = async () => {
    const confirmMessage = window.confirm("Are you sure you want to delete");

    if (confirmMessage) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          console.log("POST IS DELETED");
          //when we use prisma the res is an object , so,
          const post = await res.json();
          const { publicId } = post;
          //call the function
          await deleteImageWhenDeletePost(publicId);

          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // The end of handle delete function

  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
}
