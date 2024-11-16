import React from 'react';
import { Container } from '@mui/material';
import PreferenceForm from '../components/preferences/preferenceForm';

const EditPreferencePage = () => (
  <Container maxWidth="md">
    <PreferenceForm mode="edit" />
  </Container>
);

export default EditPreferencePage;