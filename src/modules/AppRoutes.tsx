

import { useLocation, useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { app_routesConfig } from './Routes';

export const AppRoutes = () => {

    const [isMounted, setisMounted] = useState(false)

    const location = useLocation();

    useEffect(() => {
        setisMounted(true)
    }, [])

    const routes = useRoutes(app_routesConfig);
    return <>{routes}</>;

};
