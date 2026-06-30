function ConfirmDeleteModal({
  setShowDeleteModal,
  setEmployeeToDelete,
  confirmDelete,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md border-2 border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold mb-2">Delete Employee</h2>

        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Are you sure you want to delete this employee? This action cannot be
          undone.
        </p>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            onClick={() => {
              setShowDeleteModal(false);
              setEmployeeToDelete(null);
            }}
            className="btn-primary px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-lg text-sm sm:text-base transition-all"
          >
            Cancel
          </button>

          <button
            aria-label="confirm delete"
            onClick={confirmDelete}
            className="btn-primary px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg cursor-pointer text-sm sm:text-base transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
