import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
        error={isError}
        variant="outlined"
        style={{
          marginBottom: '16px'
        }}
        InputProps={{
          style: {
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)'
            }
          }
        }}
        InputLabelProps={{
          style: {
            fontWeight: '600',
            color: '#1a202c'
          }
        }}
      />
    </Grid>
  );
}

export default FormInput;
