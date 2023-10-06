/** Types generated for queries found in "database/sql/roles.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateRole' parameters type */
export interface ICreateRoleParams {
  createdAt?: Date | string | null | void;
  deletedAt?: Date | string | null | void;
  description?: string | null | void;
  name?: string | null | void;
  updatedAt?: Date | string | null | void;
}

/** 'CreateRole' return type */
export type ICreateRoleResult = void;

/** 'CreateRole' query type */
export interface ICreateRoleQuery {
  params: ICreateRoleParams;
  result: ICreateRoleResult;
}

const createRoleIR: any = {"usedParamSet":{"name":true,"description":true,"createdAt":true,"updatedAt":true,"deletedAt":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":154,"b":158}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":169,"b":180}]},{"name":"createdAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":191,"b":200}]},{"name":"updatedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":211,"b":220}]},{"name":"deletedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":231,"b":240}]}],"statement":"INSERT INTO\n    \"roles\" (\n        \"name\",\n        \"description\",\n        \"createdAt\",\n        \"updatedAt\",\n        \"deletedAt\"\n    )\nVALUES\n    (\n        :name,\n        :description,\n        :createdAt,\n        :updatedAt,\n        :deletedAt\n    )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "roles" (
 *         "name",
 *         "description",
 *         "createdAt",
 *         "updatedAt",
 *         "deletedAt"
 *     )
 * VALUES
 *     (
 *         :name,
 *         :description,
 *         :createdAt,
 *         :updatedAt,
 *         :deletedAt
 *     )
 * ```
 */
export const createRole = new PreparedQuery<ICreateRoleParams,ICreateRoleResult>(createRoleIR);


/** 'ListManyRolesByNames' parameters type */
export interface IListManyRolesByNamesParams {
  names: readonly (string | null | void)[];
}

/** 'ListManyRolesByNames' return type */
export interface IListManyRolesByNamesResult {
  name: string;
}

/** 'ListManyRolesByNames' query type */
export interface IListManyRolesByNamesQuery {
  params: IListManyRolesByNamesParams;
  result: IListManyRolesByNamesResult;
}

const listManyRolesByNamesIR: any = {"usedParamSet":{"names":true},"params":[{"name":"names","required":false,"transform":{"type":"array_spread"},"locs":[{"a":63,"b":68}]}],"statement":"SELECT\n    \"name\"\nFROM\n    \"roles\"\nWHERE\n    \"roles\".\"name\" IN :names"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     "name"
 * FROM
 *     "roles"
 * WHERE
 *     "roles"."name" IN :names
 * ```
 */
export const listManyRolesByNames = new PreparedQuery<IListManyRolesByNamesParams,IListManyRolesByNamesResult>(listManyRolesByNamesIR);


/** 'FindNonExistentRoles' parameters type */
export interface IFindNonExistentRolesParams {
  names: readonly (string | null | void)[];
}

/** 'FindNonExistentRoles' return type */
export interface IFindNonExistentRolesResult {
  name: string | null;
}

/** 'FindNonExistentRoles' query type */
export interface IFindNonExistentRolesQuery {
  params: IFindNonExistentRolesParams;
  result: IFindNonExistentRolesResult;
}

const findNonExistentRolesIR: any = {"usedParamSet":{"names":true},"params":[{"name":"names","required":false,"transform":{"type":"array_spread"},"locs":[{"a":80,"b":85}]}],"statement":"SELECT\n    input_names.name\nFROM\n    (\n        SELECT\n            UNNEST(ARRAY [:names]) AS name\n    ) AS input_names\n    LEFT JOIN \"roles\" AS r ON input_names.name = r.name\nWHERE\n    r.name IS NULL"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     input_names.name
 * FROM
 *     (
 *         SELECT
 *             UNNEST(ARRAY [:names]) AS name
 *     ) AS input_names
 *     LEFT JOIN "roles" AS r ON input_names.name = r.name
 * WHERE
 *     r.name IS NULL
 * ```
 */
export const findNonExistentRoles = new PreparedQuery<IFindNonExistentRolesParams,IFindNonExistentRolesResult>(findNonExistentRolesIR);


/** 'CreateManyRoles' parameters type */
export interface ICreateManyRolesParams {
  roles: readonly ({
    name: string | null | void,
    description: string | null | void,
    createdAt: Date | string | null | void,
    updatedAt: Date | string | null | void,
    deletedAt: Date | string | null | void
  })[];
}

/** 'CreateManyRoles' return type */
export type ICreateManyRolesResult = void;

/** 'CreateManyRoles' query type */
export interface ICreateManyRolesQuery {
  params: ICreateManyRolesParams;
  result: ICreateManyRolesResult;
}

const createManyRolesIR: any = {"usedParamSet":{"roles":true},"params":[{"name":"roles","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"name","required":false},{"name":"description","required":false},{"name":"createdAt","required":false},{"name":"updatedAt","required":false},{"name":"deletedAt","required":false}]},"locs":[{"a":144,"b":149}]}],"statement":"INSERT INTO\n    \"roles\" (\n        \"name\",\n        \"description\",\n        \"createdAt\",\n        \"updatedAt\",\n        \"deletedAt\"\n    )\nVALUES\n    :roles"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "roles" (
 *         "name",
 *         "description",
 *         "createdAt",
 *         "updatedAt",
 *         "deletedAt"
 *     )
 * VALUES
 *     :roles
 * ```
 */
export const createManyRoles = new PreparedQuery<ICreateManyRolesParams,ICreateManyRolesResult>(createManyRolesIR);


/** 'ListManyRolesByNamesAndUserId' parameters type */
export interface IListManyRolesByNamesAndUserIdParams {
  names: readonly (string | null | void)[];
  userId?: string | null | void;
}

/** 'ListManyRolesByNamesAndUserId' return type */
export interface IListManyRolesByNamesAndUserIdResult {
  name: string;
}

/** 'ListManyRolesByNamesAndUserId' query type */
export interface IListManyRolesByNamesAndUserIdQuery {
  params: IListManyRolesByNamesAndUserIdParams;
  result: IListManyRolesByNamesAndUserIdResult;
}

const listManyRolesByNamesAndUserIdIR: any = {"usedParamSet":{"userId":true,"names":true},"params":[{"name":"names","required":false,"transform":{"type":"array_spread"},"locs":[{"a":235,"b":240}]},{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":160,"b":166}]}],"statement":"SELECT\n    \"user_roles\".\"role\" as \"name\"\nFROM\n    \"user_roles\"\n    INNER JOIN \"roles\" on \"roles\".\"name\" = \"user_roles\".\"role\"\nWHERE\n    \"user_roles\".\"userId\" = :userId\n    AND \"roles\".\"deletedAt\" IS NULL\n    AND \"user_roles\".\"role\" IN :names"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     "user_roles"."role" as "name"
 * FROM
 *     "user_roles"
 *     INNER JOIN "roles" on "roles"."name" = "user_roles"."role"
 * WHERE
 *     "user_roles"."userId" = :userId
 *     AND "roles"."deletedAt" IS NULL
 *     AND "user_roles"."role" IN :names
 * ```
 */
export const listManyRolesByNamesAndUserId = new PreparedQuery<IListManyRolesByNamesAndUserIdParams,IListManyRolesByNamesAndUserIdResult>(listManyRolesByNamesAndUserIdIR);


