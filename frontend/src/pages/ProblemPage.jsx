import { useEffect } from 'react';
import { useProblemStore} from '../store/useProblemStore';
import { ArrowLeftIcon, Trash2Icon, SaveIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';


function ProblemPage() {
  const {
    currentProblem,
    formData,
    setFormData,
    loading,
    error,
    fetchProblem,
    updateProblem,
    deleteProblem

  } = useProblemStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProblem(id)
  }, [fetchProblem, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this problem?")) {
      await deleteProblem(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Problems
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

       {/* PRODUCT FORM */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Problem</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProblem(id);
              }}
              className="space-y-6"
            >
              {/* PROBLEM NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Problem Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter problem title"
                  className="input input-bordered w-full"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* PRODUCT PRICE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Difficulty</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter problem difficulty"
                  className="input input-bordered w-full"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                />
              </div>

              {/* PROBLEM DESCRIPTION */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter any description about the problem"
                  className="input input-bordered w-full"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* FORM ACTIONS */}
              <div className="flex justify-between mt-8">
                <button type="button" onClick={handleDelete} className="btn btn-error">
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Product
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || !formData.title || !formData.difficulty || !formData.description}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProblemPage
