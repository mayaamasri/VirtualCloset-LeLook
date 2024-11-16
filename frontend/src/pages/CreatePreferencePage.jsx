import React from 'react';
import { Container } from '@mui/material';
import PreferenceForm from '../components/preferences/preferenceForm';

const CreatePreferencePage = () => (
  <Container maxWidth="md">
    <PreferenceForm mode="create" />
  </Container>
);

export default CreatePreferencePage;
