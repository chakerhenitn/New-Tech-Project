"use client";

export default function DeleteButton({ id }: { id: string }) {
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
