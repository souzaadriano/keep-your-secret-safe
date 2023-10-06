/** Types generated for queries found in "database/sql/permissions.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreatePermission' parameters type */
export interface ICreatePermissionParams {
  createdAt?: Date | string | null | void;
  deletedAt?: Date | string | null | void;
  id?: string | null | void;
  name?: string | null | void;
  updatedAt?: Date | string | null | void;
}

/** 'CreatePermission' return type */
export type ICreatePermissionResult = void;

/** 'CreatePermission' query type */
export interface ICreatePermissionQuery {
  params: ICreatePermissionParams;
  result: ICreatePermissionResult;
}

const createPermissionIR: any = {"usedParamSet":{"id":true,"name":true,"createdAt":true,"updatedAt":true,"deletedAt":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":151,"b":153}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":164,"b":168}]},{"name":"createdAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":179,"b":188}]},{"name":"updatedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":199,"b":208}]},{"name":"deletedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":219,"b":228}]}],"statement":"INSERT INTO\n    \"permissions\" (\n        \"id\",\n        \"name\",\n        \"createdAt\",\n        \"updatedAt\",\n        \"deletedAt\"\n    )\nVALUES\n    (\n        :id,\n        :name,\n        :createdAt,\n        :updatedAt,\n        :deletedAt\n    )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "permissions" (
 *         "id",
 *         "name",
 *         "createdAt",
 *         "updatedAt",
 *         "deletedAt"
 *     )
 * VALUES
 *     (
 *         :id,
 *         :name,
 *         :createdAt,
 *         :updatedAt,
 *         :deletedAt
 *     )
 * ```
 */
export const createPermission = new PreparedQuery<ICreatePermissionParams,ICreatePermissionResult>(createPermissionIR);


/** 'CreateManyPermissions' parameters type */
export interface ICreateManyPermissionsParams {
  permissions: readonly ({
    id: string | null | void,
    name: string | null | void,
    createdAt: Date | string | null | void,
    updatedAt: Date | string | null | void,
    deletedAt: Date | string | null | void
  })[];
}

/** 'CreateManyPermissions' return type */
export type ICreateManyPermissionsResult = void;

/** 'CreateManyPermissions' query type */
export interface ICreateManyPermissionsQuery {
  params: ICreateManyPermissionsParams;
  result: ICreateManyPermissionsResult;
}

const createManyPermissionsIR: any = {"usedParamSet":{"permissions":true},"params":[{"name":"permissions","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"id","required":false},{"name":"name","required":false},{"name":"createdAt","required":false},{"name":"updatedAt","required":false},{"name":"deletedAt","required":false}]},"locs":[{"a":141,"b":152}]}],"statement":"INSERT INTO\n    \"permissions\" (\n        \"id\",\n        \"name\",\n        \"createdAt\",\n        \"updatedAt\",\n        \"deletedAt\"\n    )\nVALUES\n    :permissions"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     "permissions" (
 *         "id",
 *         "name",
 *         "createdAt",
 *         "updatedAt",
 *         "deletedAt"
 *     )
 * VALUES
 *     :permissions
 * ```
 */
export const createManyPermissions = new PreparedQuery<ICreateManyPermissionsParams,ICreateManyPermissionsResult>(createManyPermissionsIR);


/** 'ListPermissionsWithRoles' parameters type */
export type IListPermissionsWithRolesParams = void;

/** 'ListPermissionsWithRoles' return type */
export interface IListPermissionsWithRolesResult {
  id: string;
  name: string;
  roles: string | null;
}

/** 'ListPermissionsWithRoles' query type */
export interface IListPermissionsWithRolesQuery {
  params: IListPermissionsWithRolesParams;
  result: IListPermissionsWithRolesResult;
}

const listPermissionsWithRolesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    p.id,\n    p.name,\n    STRING_AGG(rp.\"role\", ', ') AS roles\nFROM\n    permissions p\n    LEFT JOIN role_permissions rp ON p.id = rp.\"permissionId\"\nGROUP BY\n    p.id,\n    p.name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     p.id,
 *     p.name,
 *     STRING_AGG(rp."role", ', ') AS roles
 * FROM
 *     permissions p
 *     LEFT JOIN role_permissions rp ON p.id = rp."permissionId"
 * GROUP BY
 *     p.id,
 *     p.name
 * ```
 */
export const listPermissionsWithRoles = new PreparedQuery<IListPermissionsWithRolesParams,IListPermissionsWithRolesResult>(listPermissionsWithRolesIR);


/** 'FindOnePermissionByName' parameters type */
export interface IFindOnePermissionByNameParams {
  permissionName?: string | null | void;
}

/** 'FindOnePermissionByName' return type */
export interface IFindOnePermissionByNameResult {
  id: string;
  name: string;
  roles: string | null;
}

/** 'FindOnePermissionByName' query type */
export interface IFindOnePermissionByNameQuery {
  params: IFindOnePermissionByNameParams;
  result: IFindOnePermissionByNameResult;
}

const findOnePermissionByNameIR: any = {"usedParamSet":{"permissionName":true},"params":[{"name":"permissionName","required":false,"transform":{"type":"scalar"},"locs":[{"a":173,"b":187}]}],"statement":"SELECT\n    p.id,\n    p.name,\n    STRING_AGG(rp.\"role\", ';') AS roles\nFROM\n    permissions p\n    LEFT JOIN role_permissions rp ON p.id = rp.\"permissionId\"\nwhere\n    p.name = :permissionName\nGROUP BY\n    p.id,\n    p.name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     p.id,
 *     p.name,
 *     STRING_AGG(rp."role", ';') AS roles
 * FROM
 *     permissions p
 *     LEFT JOIN role_permissions rp ON p.id = rp."permissionId"
 * where
 *     p.name = :permissionName
 * GROUP BY
 *     p.id,
 *     p.name
 * ```
 */
export const findOnePermissionByName = new PreparedQuery<IFindOnePermissionByNameParams,IFindOnePermissionByNameResult>(findOnePermissionByNameIR);


/** 'FindOnePermissionById' parameters type */
export interface IFindOnePermissionByIdParams {
  id?: string | null | void;
}

/** 'FindOnePermissionById' return type */
export interface IFindOnePermissionByIdResult {
  id: string;
  name: string;
  roles: string | null;
}

/** 'FindOnePermissionById' query type */
export interface IFindOnePermissionByIdQuery {
  params: IFindOnePermissionByIdParams;
  result: IFindOnePermissionByIdResult;
}

const findOnePermissionByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":171,"b":173}]}],"statement":"SELECT\n    p.id,\n    p.name,\n    STRING_AGG(rp.\"role\", ';') AS roles\nFROM\n    permissions p\n    LEFT JOIN role_permissions rp ON p.id = rp.\"permissionId\"\nwhere\n    p.id = :id\nGROUP BY\n    p.id,\n    p.name"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     p.id,
 *     p.name,
 *     STRING_AGG(rp."role", ';') AS roles
 * FROM
 *     permissions p
 *     LEFT JOIN role_permissions rp ON p.id = rp."permissionId"
 * where
 *     p.id = :id
 * GROUP BY
 *     p.id,
 *     p.name
 * ```
 */
export const findOnePermissionById = new PreparedQuery<IFindOnePermissionByIdParams,IFindOnePermissionByIdResult>(findOnePermissionByIdIR);


/** 'FindUserPermissionById' parameters type */
export interface IFindUserPermissionByIdParams {
  permissionId?: string | null | void;
  userId?: string | null | void;
}

/** 'FindUserPermissionById' return type */
export interface IFindUserPermissionByIdResult {
  id: string;
  name: string;
  roles: string | null;
}

/** 'FindUserPermissionById' query type */
export interface IFindUserPermissionByIdQuery {
  params: IFindUserPermissionByIdParams;
  result: IFindUserPermissionByIdResult;
}

const findUserPermissionByIdIR: any = {"usedParamSet":{"userId":true,"permissionId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":419,"b":425}]},{"name":"permissionId","required":false,"transform":{"type":"scalar"},"locs":[{"a":471,"b":483}]}],"statement":"SELECT\n    \"permissions\".\"id\" as \"id\",\n    \"permissions\".\"name\" as \"name\",\n    STRING_AGG(\"role_permissions\".\"role\", ';') AS roles\nFROM\n    \"user_permissions\"\n    INNER JOIN \"permissions\" on \"permissions\".\"id\" = \"user_permissions\".\"permissionId\"\n    LEFT JOIN \"role_permissions\" ON \"permissions\".\"id\" = \"role_permissions\".\"permissionId\"\nWHERE\n    \"permissions\".\"deletedAt\" IS NULL\n    AND \"user_permissions\".\"userId\" = :userId\n    AND \"user_permissions\".\"permissionId\" = :permissionId\nGROUP BY\n    \"permissions\".\"id\",\n    \"permissions\".\"name\""};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     "permissions"."id" as "id",
 *     "permissions"."name" as "name",
 *     STRING_AGG("role_permissions"."role", ';') AS roles
 * FROM
 *     "user_permissions"
 *     INNER JOIN "permissions" on "permissions"."id" = "user_permissions"."permissionId"
 *     LEFT JOIN "role_permissions" ON "permissions"."id" = "role_permissions"."permissionId"
 * WHERE
 *     "permissions"."deletedAt" IS NULL
 *     AND "user_permissions"."userId" = :userId
 *     AND "user_permissions"."permissionId" = :permissionId
 * GROUP BY
 *     "permissions"."id",
 *     "permissions"."name"
 * ```
 */
export const findUserPermissionById = new PreparedQuery<IFindUserPermissionByIdParams,IFindUserPermissionByIdResult>(findUserPermissionByIdIR);


