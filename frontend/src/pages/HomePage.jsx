import { useEffect } from 'react';
import { useProblemStore } from '../store/useProblemStore';
import { PlusCircleIcon, RefreshCwIcon, DatabaseIcon } from 'lucide-react';
import ProblemCard from "../components/ProblemCard";
import AddProblemModal from '../components/AddProblemModal';

function HomePage() {
  const { problems, loading, error, fetchProblems } = useProblemStore();

  useEffect(() => {
    fetchProblems()
  }, [fetchProblems]);


  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-primary"
          onClick={() => document.getElementById('add_problem_modal').showModal()}>
          <PlusCircleIcon className="size-5 mr-2" />
          Add Problem
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProblems}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <AddProblemModal />

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {problems.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <DatabaseIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No problems found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first problem to track your progress.
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <ProblemCard key = {problem.id} problem={problem} />
          ))}
        </div>
      )}
    </main>
  )
}

export default HomePage;
