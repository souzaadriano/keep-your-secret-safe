/* @name createPermission */
INSERT INTO
    "permissions" (
        "id",
        "name",
        "createdAt",
        "updatedAt",
        "deletedAt"
    )
VALUES
    (
        :id,
        :name,
        :createdAt,
        :updatedAt,
        :deletedAt
    );

/*
 @name createManyPermissions
 @param permissions -> ((id, name, createdAt, updatedAt, deletedAt)...)
 */
INSERT INTO
    "permissions" (
        "id",
        "name",
        "createdAt",
        "updatedAt",
        "deletedAt"
    )
VALUES
    :permissions;

/* @name listPermissionsWithRoles */
SELECT
    p.id,
    p.name,
    STRING_AGG(rp."role", ', ') AS roles
FROM
    permissions p
    LEFT JOIN role_permissions rp ON p.id = rp."permissionId"
GROUP BY
    p.id,
    p.name;

/* @name findOnePermissionByName */
SELECT
    p.id,
    p.name,
    STRING_AGG(rp."role", ';') AS roles
FROM
    permissions p
    LEFT JOIN role_permissions rp ON p.id = rp."permissionId"
where
    p.name = :permissionName
GROUP BY
    p.id,
    p.name;

/* @name findOnePermissionById */
SELECT
    p.id,
    p.name,
    STRING_AGG(rp."role", ';') AS roles
FROM
    permissions p
    LEFT JOIN role_permissions rp ON p.id = rp."permissionId"
where
    p.id = :id
GROUP BY
    p.id,
    p.name;

/* 
 @name findUserPermissionById
 */
SELECT
    "permissions"."id" as "id",
    "permissions"."name" as "name",
    STRING_AGG("role_permissions"."role", ';') AS roles
FROM
    "user_permissions"
    INNER JOIN "permissions" on "permissions"."id" = "user_permissions"."permissionId"
    LEFT JOIN "role_permissions" ON "permissions"."id" = "role_permissions"."permissionId"
WHERE
    "permissions"."deletedAt" IS NULL
    AND "user_permissions"."userId" = :userId
    AND "user_permissions"."permissionId" = :permissionId
GROUP BY
    "permissions"."id",
    "permissions"."name";