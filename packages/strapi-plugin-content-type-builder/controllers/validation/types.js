'use strict';

const yup = require('yup');
const { validators, VALID_TYPES, isValidName } = require('./common');

module.exports = obj => {
  return {
    type: yup
      .string()
      .oneOf(VALID_TYPES)
      .required(),
    ...getTypeShape(obj),
  };
};

const getTypeShape = obj => {
  switch (obj.type) {
    /**
     * complexe types
     */

    case 'media': {
      return {
        multiple: yup.boolean(),
        required: validators.required,
        unique: validators.unique,
      };
    }

    /**
     * scalar types
     */
    case 'string':
    case 'text':
    case 'richtext': {
      return {
        default: yup.string(),
        required: validators.required,
        unique: validators.unique,
        min: validators.minLength,
        max: validators.maxLength,
      };
    }
    case 'json': {
      return {
        required: validators.required,
        unique: validators.unique,
      };
    }
    case 'enumeration': {
      return {
        enum: yup
          .array()
          .of(yup.string().test(isValidName))
          .min(1)
          .required(),
        default: yup
          .string()
          .when('enum', enumVal => yup.string().oneOf(enumVal)),
        enumName: yup.string().test(isValidName),
        required: validators.required,
        unique: validators.unique,
      };
    }
    case 'password': {
      return {
        required: validators.required,
        min: validators.minLength,
        max: validators.maxLength,
      };
    }
    case 'email': {
      return {
        default: yup.string().email(),
        required: validators.required,
        unique: validators.unique,
        min: validators.minLength,
        max: validators.maxLength,
      };
    }
    case 'integer': {
      return {
        default: yup.number().integer(),
        required: validators.required,
        unique: validators.unique,
        min: yup.number().integer(),
        max: yup.number().integer(),
      };
    }
    case 'float': {
      return {
        default: yup.number(),
        required: validators.required,
        unique: validators.unique,
        min: yup.number(),
        max: yup.number(),
      };
    }
    case 'decimal': {
      return {
        default: yup.number(),
        required: validators.required,
        unique: validators.unique,
        min: yup.number(),
        max: yup.number(),
      };
    }
    case 'date': {
      return {
        default: yup.date(),
        required: validators.required,
        unique: validators.unique,
      };
    }
    case 'boolean': {
      return {
        default: yup.boolean(),
        required: validators.required,
        unique: validators.unique,
      };
    }
    default: {
      return {};
    }
  }
};
