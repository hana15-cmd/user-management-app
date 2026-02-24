import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserManagement from '../components/UserManagement';
import type { AuthUser } from '../types';

const mockAdminUser: AuthUser = {
  id: 1,
  name: 'Admin User',
  role: 'admin',
};

const mockViewerUser: AuthUser = {
  id: 2,
  name: 'Viewer User',
  role: 'viewer',
};

describe('UserManagement', () => {
  it('should render component title', () => {
    render(<UserManagement currentUser={mockAdminUser} />);
    expect(screen.getByText('User Management')).toBeInTheDocument();
  });

  it('should render UserStats', () => {
    render(<UserManagement currentUser={mockAdminUser} />);
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('Admin Users')).toBeInTheDocument();
  });

  it('should render UserTable', () => {
    render(<UserManagement currentUser={mockAdminUser} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should show "Add User" button for admin', () => {
    render(<UserManagement currentUser={mockAdminUser} />);
    expect(screen.getByText('+ Add User')).toBeInTheDocument();
  });

  it('should not show "Add User" button for viewer', () => {
    render(<UserManagement currentUser={mockViewerUser} />);
    expect(screen.queryByText('+ Add User')).not.toBeInTheDocument();
  });

  it('should display generated users', () => {
    render(<UserManagement currentUser={mockAdminUser} />);
    // Check for table rows (header + user rows)
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(1);
  });

  it('should open add user modal when clicking Add User', async () => {
    const user = userEvent.setup();
    render(<UserManagement currentUser={mockAdminUser} />);
    
    const addButton = screen.getByText('+ Add User');
    await user.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('Add New User')).toBeInTheDocument();
    });
  });

  it('should show edit modal title when editing', async () => {
    const user = userEvent.setup();
    render(<UserManagement currentUser={mockAdminUser} />);
    
    const editButtons = screen.getAllByText('Edit');
    await user.click(editButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Edit User')).toBeInTheDocument();
    });
  });

  it('should add a new user', async () => {
    const user = userEvent.setup();
    render(<UserManagement currentUser={mockAdminUser} />);
    
    const addButton = screen.getByText('+ Add User');
    await user.click(addButton);
    
    await waitFor(async () => {
      const nameInput = screen.getByPlaceholderText('Enter name');
      const emailInput = screen.getByPlaceholderText('Enter email');
      const saveButton = screen.getByText('Add User');
      
      await user.type(nameInput, 'New User');
      await user.type(emailInput, 'newuser@test.com');
      await user.click(saveButton);
    });
    
    await waitFor(() => {
      expect(screen.getByText('New User')).toBeInTheDocument();
      expect(screen.getByText('newuser@test.com')).toBeInTheDocument();
    });
  });

  it('should not show edit/delete buttons for viewer role', () => {
    render(<UserManagement currentUser={mockViewerUser} />);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('should show edit/delete buttons for admin role', () => {
    render(<UserManagement currentUser={mockAdminUser} />);
    expect(screen.getAllByText('Edit').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Delete').length).toBeGreaterThan(0);
  });
});
