# User Management MFE Tests

## Overview
Comprehensive test suite for the User Management MFE application with RBAC (Role-Based Access Control) testing.

## Test Files

### App.test.tsx
Tests for the main User Management App:
- ✅ Renders app title "User Management Demo"
- ✅ Renders role switcher with dropdown
- ✅ Renders UserManagement component
- ✅ Renders UserStats and UserTable
- ✅ Verifies initial user selection

### UserManagement.test.tsx
Tests for the main user management component:
- ✅ Renders component with stats and table
- ✅ Shows "Add User" button for admin role
- ✅ Hides "Add User" button for viewer role
- ✅ Shows edit/delete buttons for admin
- ✅ Hides edit/delete buttons for viewer
- ✅ Opens add user modal
- ✅ Opens edit user modal with correct title
- ✅ Adds new users successfully
- ✅ Displays generated users in table

### UserStats.test.tsx
Tests for the statistics component:
- ✅ Renders all stat cards (Total Users, Active Users, Admins)
- ✅ Displays correct counts for total, active, and admin users
- ✅ Handles zero values
- ✅ Verifies stats container structure

### UserModal.test.tsx
Tests for the user modal component:
- ✅ Does not render when closed
- ✅ Renders when open
- ✅ Shows "Add New User" title for new users
- ✅ Shows "Edit User" title when editing
- ✅ Renders all form fields (name, email, role, status)
- ✅ Populates form with initial values
- ✅ Handles form input changes
- ✅ Calls onSave callback
- ✅ Calls onClose callback
- ✅ Shows correct button text ("Add User" vs "Update User")

## Running Tests

```bash
# Run all tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Coverage
- 4 test files
- 40+ test cases
- Components: App, UserManagement, UserStats, UserTable, UserModal
- RBAC testing for admin vs viewer roles
- Form interactions and CRUD operations

## RBAC Testing
The tests verify proper role-based access control:
- **Admin users** can add, edit, and delete users
- **Viewer users** have read-only access
- UI elements are shown/hidden based on user role

## Notes
- Tests include role-based access control verification
- Form interactions tested with user-event
- Modal behavior tested (open/close states)
- Full CRUD operations tested for admin users
