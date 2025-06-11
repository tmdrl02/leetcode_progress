import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:3000';

export const useProblemStore = create((set, get) => ({
  problems:[],
  loading:false,
  error:null,
  currentProblem: null,

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

  fetchProblem: async (id) => {
    set({ loading: true});
    try {
      const response = await axios.get(`${BASE_URL}/api/problems/${id}`);
      set({ currentProblem: response.data.data,
        formData: response.data.data,
        error: null
      });
    } catch (error) {
      console.log("Failed to fetch problem:", error);
      set({ error: "Failed to fetch problem. Please try again later.", currentProblem: null });

    } finally {
      set({ loading: false });
    }
  },
  updateProblem: async (id, formData) => {
    set({ loading: true });
    try {
      const {formData} = get();
      const response = await axios.put(`${BASE_URL}/api/problems/${id}`, formData);
      set({ currentProblem: response.data.data });
      toast.success("Problem updated successfully!");
    } catch (error) {
      console.log("Failed to update problem:", error);
      toast.error("Something went wrong while updating the problem.");
    } finally {
      set({ loading: false });
    }
  }
  
}));