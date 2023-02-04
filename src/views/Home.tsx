import { Button } from '@mui/material';
import ProjectsTable from '../components/ProjectsTable';
import Spacing from '../components/Spacing';
import React from 'react';
import {
  // existing code
  useNavigate,
} from 'react-router-dom';

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <div style={{ padding: '50' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/editor');
            }}
          >
            New Project
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/editor');
            }}
          >
            Open Project
          </Button>
        </div>
        <Spacing space={40} />
        <ProjectsTable />
      </div>
    </div>
  );
};

export default Home;
