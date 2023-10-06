/* @name createRole */
INSERT INTO
    "roles" (
        "name",
        "description",
        "createdAt",
        "updatedAt",
        "deletedAt"
    )
VALUES
    (
        :name,
        :description,
        :createdAt,
        :updatedAt,
        :deletedAt
    );

/* 
 @name listManyRolesByNames 
 @param names -> (...) 
 */
SELECT
    "name"
FROM
    "roles"
WHERE
    "roles"."name" IN :names;

/* 
 @name findNonExistentRoles
 @param names -> (...) 
 */
SELECT
    input_names.name
FROM
    (
        SELECT
            UNNEST(ARRAY [:names]) AS name
    ) AS input_names
    LEFT JOIN "roles" AS r ON input_names.name = r.name
WHERE
    r.name IS NULL;

/*
 @name createManyRoles
 @param roles -> ((name, description, createdAt, updatedAt, deletedAt)...)
 */
INSERT INTO
    "roles" (
        "name",
        "description",
        "createdAt",
        "updatedAt",
        "deletedAt"
    )
VALUES
    :roles;

/* 
 @name listManyRolesByNamesAndUserId 
 @param names -> (...)
 */
SELECT
    "user_roles"."role" as "name"
FROM
    "user_roles"
    INNER JOIN "roles" on "roles"."name" = "user_roles"."role"
WHERE
    "user_roles"."userId" = :userId
    AND "roles"."deletedAt" IS NULL
    AND "user_roles"."role" IN :names;