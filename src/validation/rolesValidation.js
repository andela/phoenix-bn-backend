import ResponseMsg from '../utils/responseMessages';

const { resError } = ResponseMsg;

/**
 * @name sentUserRoleValidation
 * @description validate sent user role
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The response object
 * @returns {object} The API response or next()
 */
const sentUserRoleValidation = (req, res, next) => {
  let role = 'Requester';
  if (req.body.role) role = req.body.role.toLowerCase();
  if (role !== 'Requester'
        && role !== 'requester'
        && role !== 'manager'
        && role !== 'traval team member'
        && role !== 'travel administrator'
        && role !== 'super admonistrator') {
    return resError(res, 400, 'Incorrect role type sent.');
  }
  req.body.role = role.charAt(0).toUpperCase() + role.slice(1);
  return next();
};

export default { sentUserRoleValidation };
