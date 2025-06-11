import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:3000';

export const useProblemStore = create((set, get) => ({
  problems:[],
  loading:false,
  error:null,

  formData : {
    title: "",
    difficulty: "",
    description: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({
    formData: {
      title: "",
      difficulty: "",
      description: "",
    },
  }),

  addProblem: async(e) => {
    e.preventDefault();
    set({ loading: true });

    try {
        const {formData} = get();
        await axios.post(`${BASE_URL}/api/problems`, formData);
        await get().fetchProblems();
        get().resetForm();
        toast.success("Problem added successfully!");
    } catch (error) {
        console.log("Failed to add problem:", error);
        toast.error("Something went wrong while adding the problem.");
    } finally {
        set({ loading: false });
    }
  },

  fetchProblems: async () => {
    set({loading:true});
    try {
      const response = await axios.get(`${BASE_URL}/api/problems`)
      set({ problems: response.data.data, error:null });
    } catch (err) {
      if(err.status == 429) set({error:"Too many requests. Please try again later."});
      else set({error:"Failed to fetch problems. Please try again later."});
    } finally {
        set({loading:false});
    }
  },

  deleteProblem: async (id) => {
    set({ loading: true});
    try {
      await axios.delete(`${BASE_URL}/api/problems/${id}`);
      set(prev => ({problems: prev.problems.filter(problem => problem.id !== id)}));
      toast.success("Problem deleted successfully!");
    } catch (err) {
      console.log("Failed to delete problem:", err);
      toast.error("Something went wrong while deleting the problem.");

    } finally {
        set({loading:false});
    }
  },

}));