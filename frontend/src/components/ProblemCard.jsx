import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";

function ProblemCard({problem}) {
    const { deleteProblem } = useProblemStore();

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        {/* PROBLEM INFO */}
        <h2 className="card-title text-lg font-semibold">{problem.title}</h2>
        <p className="text-2xl font-bold text-primary">
          <span className="font-medium ml-1">{problem.difficulty}</span>
        </p>

        {/* CARD ACTIONS */}
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/problem/${problem.id}`}
            className="btn btn-sm btn-info btn-outline"
          >
            <EditIcon className="w-4 h-4" />
          </Link>

          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() => deleteProblem(problem.id)}
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProblemCard
