/* @name createRolePermission */
INSERT INTO
    "role_permissions" ("role", "permissionId")
VALUES
    (:role, :permissionId);

/* @name createUserRole */
INSERT INTO
    "user_roles" ("role", "userId")
VALUES
    (:role, :userId);

/* @name createUserPermission */
INSERT INTO
    "user_permissions" ("permissionId", "userId", "status")
VALUES
    (:roleId, :permissionId, :status);