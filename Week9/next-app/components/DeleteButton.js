"use client";

import Swal from "sweetalert2";

export default function DeleteButton() {
  const handleDelete = (e) => {
    // Prevent default form submission to wait for SweetAlert confirmation
    e.preventDefault();
    const form = e.currentTarget.closest("form");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      // If user confirms, programmatically submit the parent form to trigger Server Action
      if (result.isConfirmed && form) {
        form.requestSubmit();
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-danger btn-sm"
      onClick={handleDelete}
    >
      ลบ
    </button>
  );
}