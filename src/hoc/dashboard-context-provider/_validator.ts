import joi from '@hapi/joi';

import { ItemTypes } from '../../components/dashboard/_constants';

const dashboardCoordinate = joi.object({
  row: joi
    .number()
    .greater(0)
    .required(),
  column: joi
    .number()
    .greater(0)
    .required(),
});

const dashboardItem = joi.object({
  id: joi.string().required(),
  anchor: dashboardCoordinate.required(),
  positions: joi
    .array()
    .items(dashboardCoordinate)
    .min(1)
    .required(),
  type: joi
    .string()
    .valid(ItemTypes.label, ItemTypes.query)
    .required(),
  width: joi
    .number()
    .greater(0)
    .required(),
  height: joi
    .number()
    .greater(0)
    .required(),
  // labels
  title: joi.string(),
  subTitle: joi.string(),
  // query
  query: joi.string(),
});

const dashboard = joi.object({
  name: joi
    .string()
    .min(1)
    .required(),
  items: joi
    .array()
    .items(dashboardItem)
    .min(1)
    .required(),
});

export const validateDashboard = (encodedJson: string) => {
  try {
    const parsed = JSON.parse(encodedJson);
    const { error } = dashboard.validate(parsed);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    return error.message;
  }
};
