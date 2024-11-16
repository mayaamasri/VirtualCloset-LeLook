import React from 'react';
import { Container } from '@mui/material';
import PreferenceForm from '../../components/Preferences/form/PreferenceForm';

const CreatePreferencePage = () => (
  <Container maxWidth="md">
    <PreferenceForm mode="create" />
  </Container>
);

export default CreatePreferencePage;
