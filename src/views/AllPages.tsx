import { Button, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const AllPages = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div>AllPages</div>
      <Stack spacing={2} direction="column">
      <Button variant="contained" onClick={()=>navigate('/signin')}>Sign In</Button>
      <Button variant="contained" onClick={()=>navigate('/signup')}>Sign Up</Button>
      <Button variant="contained" onClick={()=>navigate('/pricing')}>Pricing</Button>
      <Button variant="contained" onClick={()=>navigate('/home')}>Home</Button>
      <Button variant="contained" onClick={()=>navigate('/editor')}>Editor</Button>
      <Button variant="contained" onClick={()=>navigate('/settings')}>Settings</Button>
      </Stack>
    </div>
  );
};

export default AllPages;
