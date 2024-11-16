import React from 'react';
import { Container } from '@mui/material';
import ItemForm from '../../components/Items/itemsAdd/ItemForm';
import {useParams} from 'react-router-dom';

const EditItemPage = () => {
  const { id } = useParams();
  return (
    <Container maxWidth="md">
      <ItemForm id={id} />
    </Container>
  );
};

export default EditItemPage;