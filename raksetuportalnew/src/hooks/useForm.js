import { useState, useCallback } from 'react';

/**
 * Reusable form hook.
 * @param {Object} options - Configuration object.
 *   - initialValues: object with initial field values
 *   - validate: function(formData) => errors object
 *   - onSubmit: async function(formData) for submission logic
 * @returns {Object} - formData, errors, submitState, handleChange, handleSubmit, reset, setIdle.
 */
export const useForm = ({ initialValues, validate, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle'); // idle | submitting | success | error

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const validationErrors = validate ? validate(formData) : {};
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.form;
      return newErrors;
    });
    setSubmitState('submitting');
    try {
      if (onSubmit) await onSubmit(formData);
      setSubmitState('success');
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message || 'Submission failed' }));
      setSubmitState('error');
    }
  }, [formData, validate, onSubmit]);

  const reset = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setSubmitState('idle');
  }, [initialValues]);

  const setIdle = useCallback(() => setSubmitState('idle'), []);

  return { formData, errors, submitState, handleChange, handleSubmit, reset, setIdle };
};

export default useForm;
