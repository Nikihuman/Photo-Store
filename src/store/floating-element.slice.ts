import { createSlice } from '@reduxjs/toolkit';

export interface IControllersState {
	sideBar: boolean,
	searchBar: boolean
}

const initialState: IControllersState = {
	sideBar: false,
	searchBar: false
};

const floatingElementSlice = createSlice({
	name: 'floating',
	initialState,
	reducers: (create) =>({
		sideBarController: create.reducer(state =>{
			state.sideBar ? state.sideBar = false : state.sideBar = true;
		}),
		searchBarController: create.reducer(state =>{
			state.searchBar ? state.searchBar = false : state.searchBar = true;
		})
	}),
	selectors: {
		sideBar: state => state.sideBar,
		searchBar: state => state.sideBar
	}
});
	

export default floatingElementSlice.reducer;
export const {searchBar, sideBar} = floatingElementSlice.selectors;
export const floatingActions = floatingElementSlice.actions;