import create from 'zustand'

export type CreatorsStore = {
 
};

const useStore = create<CreatorsStore>((set, get) => {

  return {
    // nodes: [],
    // setNodes: (nodes: BaseNodeData[]) => set({ nodes }),
  }
});

export { useStore };