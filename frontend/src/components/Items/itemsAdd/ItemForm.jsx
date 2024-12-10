import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
  CircularProgress,
  Collapse
} from '@mui/material';
import { useItemForm } from '../../../hooks/useItemsForm';
import { ITEM_CONSTANTS } from './constants';
import { ITEM_STYLES } from './styles';
import { FormFields } from './FormFields';
import ImageUpload from './ImageUpload';
import ItemReview from './ItemReview';

const ItemForm = ({ id = null }) => {
  const {
    loading,
    submitting,
    success,
    error,
    categories,
    formData,
    currentImageUrl,
    setFormData,
    setError,
    handleSubmit,
    navigate
  } = useItemForm(id);

  const [activeStep, setActiveStep] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [showAiSuccess, setShowAiSuccess] = useState(false);

  const handleImageSelect = (file) => {
    setFormData(prev => ({ ...prev, image: file }));
    setError('');
    setAiAnalysis(null);
    setShowAiSuccess(false);
  };

  const handleAiAnalysis = (analysisResult) => {
    setAiAnalysis(analysisResult);
    setShowAiSuccess(true);
    
    // Update form data with AI analysis
    setFormData(prev => ({
      ...prev,
      name: analysisResult.name || '',
      category: analysisResult.category_name || '',
      color: analysisResult.color || '',
      season: analysisResult.season || ''
    }));

    // Auto-advance to next step after brief delay
    setTimeout(() => {
      handleNext();
      setShowAiSuccess(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        if (!formData.image && !currentImageUrl) {
          setError('Please upload an image');
          return false;
        }
        break;
      case 1:
        if (!formData.name || !formData.category) {
          setError('Please fill in all required fields');
          return false;
        }
        break;
      default:
        break;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={ITEM_STYLES.mainContainer}>
      <Typography variant="h4" sx={ITEM_STYLES.title}>
        {id ? 'Edit Item' : 'Add New Item'}
      </Typography>

      <Collapse in={showAiSuccess}>
        <Alert severity="success" sx={{ mb: 3 }}>
          AI analysis complete! Details have been filled automatically.
        </Alert>
      </Collapse>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Item {id ? 'updated' : 'added'} successfully! Redirecting...
        </Alert>
      )}

      {!id && (
        <Stepper activeStep={activeStep} sx={ITEM_STYLES.stepper}>
          {ITEM_CONSTANTS.STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      {error && (
        <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {id ? (
        <>
          <ImageUpload
            onImageSelect={handleImageSelect}
            currentImageUrl={currentImageUrl}
            onAiAnalysis={handleAiAnalysis}
          />
          <FormFields
            formData={formData}
            handleChange={handleChange}
            categories={categories}
          />
        </>
      ) : (
        activeStep === 0 ? (
          <ImageUpload 
            onImageSelect={handleImageSelect}
            onAiAnalysis={handleAiAnalysis}
          />
        ) : activeStep === 1 ? (
          <FormFields
            formData={formData}
            handleChange={handleChange}
            categories={categories}
          />
        ) : (
          <ItemReview formData={formData} />
        )
      )}

      <Box sx={ITEM_STYLES.buttons}>
        {id ? (
          <>
            <Button
              variant="outlined"
              onClick={() => navigate('/items')}
              sx={ITEM_STYLES.button}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting}
              sx={{ ...ITEM_STYLES.button, ...ITEM_STYLES.submitButton }}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </>
        ) : (
          <>
            {activeStep !== 0 && (
              <Button onClick={() => setActiveStep(prev => prev - 1)}>
                Back
              </Button>
            )}
            {activeStep === ITEM_CONSTANTS.STEPS.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitting}
                sx={{ ...ITEM_STYLES.button, ...ITEM_STYLES.submitButton }}
              >
                {submitting ? 'Saving...' : 'Save Item'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ ...ITEM_STYLES.button, ...ITEM_STYLES.submitButton }}
              >
                Next
              </Button>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ItemForm;