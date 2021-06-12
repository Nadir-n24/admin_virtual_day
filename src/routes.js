import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/AccountView';
import UsersListView from 'src/views/ApplicantsListView';
import DashboardView from 'src/views/DashboardView/index';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import SettingsView from 'src/views/SettingsView';
import ScheduleView from './views/ScheduleView';
import LectureView from './views/LectureView';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'applicants', element: <UsersListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'schedule', element: <ScheduleView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'testlecture', element: <LectureView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
