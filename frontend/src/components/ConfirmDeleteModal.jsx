function ConfirmDeleteModal({
  setShowDeleteModal,
  setEmployeeToDelete,
  confirmDelete,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-2">Delete Employee</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this employee? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setShowDeleteModal(false);
              setEmployeeToDelete(null);
            }}
            className="btn-primary px-4 py-2 bg-gray-400 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="btn-primary px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
