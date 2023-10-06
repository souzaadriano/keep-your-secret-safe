/** Types generated for queries found in "database/sql/access.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateRolePermission' parameters type */
export interface ICreateRolePermissionParams {
  permissionId?: string | null | void;
  role?: string | null | void;
}

/** 'CreateRolePermission' return type */
export type ICreateRolePermissionResult = void;

/** 'CreateRolePermission' query type */
export interface ICreateRolePermissionQuery {
  params: ICreateRolePermissionParams;
  result: ICreateRolePermissionResult;
}

const createRolePermissionIR: any = {"usedParamSet":{"role":true,"permissionId":true},"params":[{"name":"role","required":false,"transform":{"type":"scalar"},"locs":[{"a":72,"b":76}]},{"name":"permissionId","required":false,"transform":{"type":"scalar"},"locs":[{"a":79,"b":91}]}],"statement":"INSERT INTO\n    \"role_permissions\" (\"role\", \"permissionId\")\nVALUES\n    (:role, :permissionId)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "role_permissions" ("role", "permissionId")
 * VALUES
 *     (:role, :permissionId)
 * ```
 */
export const createRolePermission = new PreparedQuery<ICreateRolePermissionParams,ICreateRolePermissionResult>(createRolePermissionIR);


/** 'CreateUserRole' parameters type */
export interface ICreateUserRoleParams {
  role?: string | null | void;
  userId?: string | null | void;
}

/** 'CreateUserRole' return type */
export type ICreateUserRoleResult = void;

/** 'CreateUserRole' query type */
export interface ICreateUserRoleQuery {
  params: ICreateUserRoleParams;
  result: ICreateUserRoleResult;
}

const createUserRoleIR: any = {"usedParamSet":{"role":true,"userId":true},"params":[{"name":"role","required":false,"transform":{"type":"scalar"},"locs":[{"a":60,"b":64}]},{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":67,"b":73}]}],"statement":"INSERT INTO\n    \"user_roles\" (\"role\", \"userId\")\nVALUES\n    (:role, :userId)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "user_roles" ("role", "userId")
 * VALUES
 *     (:role, :userId)
 * ```
 */
export const createUserRole = new PreparedQuery<ICreateUserRoleParams,ICreateUserRoleResult>(createUserRoleIR);


/** 'CreateUserPermission' parameters type */
export interface ICreateUserPermissionParams {
  permissionId?: string | null | void;
  roleId?: string | null | void;
  status?: boolean | null | void;
}

/** 'CreateUserPermission' return type */
export type ICreateUserPermissionResult = void;

/** 'CreateUserPermission' query type */
export interface ICreateUserPermissionQuery {
  params: ICreateUserPermissionParams;
  result: ICreateUserPermissionResult;
}

const createUserPermissionIR: any = {"usedParamSet":{"roleId":true,"permissionId":true,"status":true},"params":[{"name":"roleId","required":false,"transform":{"type":"scalar"},"locs":[{"a":84,"b":90}]},{"name":"permissionId","required":false,"transform":{"type":"scalar"},"locs":[{"a":93,"b":105}]},{"name":"status","required":false,"transform":{"type":"scalar"},"locs":[{"a":108,"b":114}]}],"statement":"INSERT INTO\n    \"user_permissions\" (\"permissionId\", \"userId\", \"status\")\nVALUES\n    (:roleId, :permissionId, :status)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "user_permissions" ("permissionId", "userId", "status")
 * VALUES
 *     (:roleId, :permissionId, :status)
 * ```
 */
export const createUserPermission = new PreparedQuery<ICreateUserPermissionParams,ICreateUserPermissionResult>(createUserPermissionIR);


