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

/* @name setUserPermission */
INSERT INTO
    "user_permissions" ("permissionId", "userId", "status")
VALUES
    (:permissionId :userId :status);

/* @name createRole */
INSERT INTO
    "roles" (
        "id",
        "name",
        "createdAt",
        "updatedAt",
        "deletedAt"
    )
VALUES
    (:id :name :createdAt :updatedAt :deletedAt);

/* @name setUserRoles */
INSERT INTO
    "user_roles" ("roleId", "userId")
VALUES
    (:roleId :userId);