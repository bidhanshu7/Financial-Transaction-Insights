"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addConstraint("filters", {
      fields: ["filterTypeId"],
      type: "foreign key",
      name: "fk_filters_filter_types",
      references: {
        field: "filterTypeId",
        table: "filter_types",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("users", {
      fields: ["roleId"],
      type: "foreign key",
      name: "fk_user_role",
      references: {
        table: "roles",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("role_filters", {
      fields: ["roleId"],
      name: "fk_role_role_filters",
      references: {
        field: "id",
        table: "roles",
      },
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("role_filters", {
      fields: ["filterId"],
      name: "fk_filters_role_filters",
      references: {
        field: "id",
        table: "filters",
      },
      type: "foreign key",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addIndex("filters", ["filterTypeId", "filterValue"], {
      unique: true,
      name: "unique_filterTypeId_filterValue",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Remove the foreign key constraints added in the `up` migration.
     */

    await queryInterface.removeConstraint("filters", "fk_filters_filter_types");
    await queryInterface.removeConstraint("users", "fk_user_role");
    await queryInterface.removeConstraint(
      "role_filters",
      "fk_role_role_filters"
    );
    await queryInterface.removeConstraint(
      "role_filters",
      "fk_filters_role_filters"
    );
    await queryInterface.removeIndex(
      "filters",
      "unique_filterTypeId_filterValue"
    );
  },
};
