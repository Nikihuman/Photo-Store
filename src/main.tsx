import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from './pages/Auth/AuthLayout.tsx';
import { LoginForm } from './pages/Auth/LoginForm/LoginForm.tsx';
import { RegisterForm } from './pages/Auth/RegisterForm/RegisterForm.tsx';
import { Main } from './pages/Main/Main.tsx';
import { Background } from './components/Background/Background.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { SearchResult } from './pages/Main/SearchResult/SearchResult.tsx';
import { WelcomePage } from './pages/Main/WelcomePage/WelcomePage.tsx';
import { getCollectionPhotosLoader, searchLoader } from './helpers/loaders.ts';
import { CollectionPhotos } from './pages/Main/CollectionPhotos/CollectionPhotos.tsx';
import { FavoriteList } from './pages/Main/FavoriteList/FavoriteList.tsx';
import { RequestUserInfo } from './components/RequestUserInfo/RequestUserInfo.tsx';
import { ErrorPage } from './pages/Error/ErrorPage.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequestUserInfo>
				<Main />
			</RequestUserInfo>
		),
		children: [
			{
				path: '/search/:query/area/:areaId/page/:page',
				element: <SearchResult />,
				loader: searchLoader,
				errorElement: <ErrorPage message="Failed to load resurs for Search result" />
			},
			{
				path: '/collectionId/:id/page/:page',
				element: <CollectionPhotos />,
				loader: getCollectionPhotosLoader,
				errorElement: <ErrorPage message="Failed to load resurs for Collection's photos" />
			},
			{
				path: '/favorite',
				element: <FavoriteList />
			},
			{
				path: '/',
				element: <WelcomePage />
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <LoginForm />
			},
			{
				path: 'register',
				element: <RegisterForm />
			}
		]
	},
	{
		path: '*',
		element: <ErrorPage />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Background>
				<RouterProvider router={router} />
			</Background>
		</Provider>
	</React.StrictMode>
);
