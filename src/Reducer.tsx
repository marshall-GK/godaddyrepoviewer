export enum RepositoryReducerActionKey {
  SET_REPOSITORY = "SET_REPOSITORY",
  SET_LOADING = 'SET_LOADING'
}

export const defautRepositoryReducer = {
  repositoryList: [],
  loading: true
} as {
  repositoryList: any[];
  loading: boolean;
};

export const RepositoryReducer = (
  state = defautRepositoryReducer,
  action: any
) => {
  switch (action.type) {
    case RepositoryReducerActionKey.SET_REPOSITORY:
      return {
        ...state,
        repositoryList: [...action.payload],
      };
    case RepositoryReducerActionKey.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      console.error(`No Action type found - ${action.type}`);
      return state;
  }
};
