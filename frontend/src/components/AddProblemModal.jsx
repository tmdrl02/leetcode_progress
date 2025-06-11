import { useProblemStore } from "../store/useProblemStore"
import { Package2Icon, ShapesIcon, PencilLineIcon, LinkIcon, PlusCircleIcon} from "lucide-react";

function AddProblemModal() {
  const { addProblem, formData, setFormData, loading } = useProblemStore();
  return (
    <dialog id="add_problem_modal" className="modal">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        {/* MODAL HEADER */}
        <h3 className="font-bold text-lg">Add New Problem</h3>

        <form onSubmit={addProblem} className="space-y-6">
          <div className="grid gap-6">
            {/* PROBLEM TITLE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Prblem Title</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter problem title"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            {/* PROBLEM DESCRIPTION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Prblem Description</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <PencilLineIcon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter any description about the problem"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            {/* PROBLEM DIFFICULTY */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Prblem Difficulty</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ShapesIcon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter problem difficulty (Easy, Medium, Hard)"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                />
              </div>
            </div>

            
          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={!formData.title || !formData.description || !formData.difficulty || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Problem
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* BACKDROP */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>

    </dialog>
  )
}

export default AddProblemModal
