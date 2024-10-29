
import { FC, Suspense, lazy } from 'react';
import { Route, RouteObject, Routes } from "react-router-dom";
import Public_main from './public/Public_main';

// const Dashboard = lazy(() => import('./dashboard/Dashboard_main'));
// const Public = lazy(() => import('./public/Public_main'));

const LazyComponent: React.FC<{ Component: React.ComponentType }> = ({ Component }) => (
    <Suspense fallback={'Loading...'}>
        <Component />
    </Suspense>
);

export const app_routesConfig: RouteObject[] = [
    // {
    //     path: '/dashboard/*',
    //     element: <LazyComponent Component={Dashboard} />
    // },
    {
        path: '*',
        element: <Public_main />
    }
];


