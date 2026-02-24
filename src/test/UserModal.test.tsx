import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserModal from '../components/UserModal';
import type { User } from '../types';

describe('UserModal', () => {
  const mockForm = {
    name: 'Test User',
    email: 'test@example.com',
    role: 'viewer' as const,
    status: 'Active' as const,
  };

  const mockUser: User = {
    id: 1,
    name: 'Existing User',
    email: 'existing@test.com',
    role: 'viewer',
    status: 'Active',
    createdAt: '2026-02-24',
  };

  it('should not render when closed', () => {
    const mockOnChange = vi.fn();
    const mockOnSave = vi.fn();
    const mockOnClose = vi.fn();

    const { container } = render(
      <UserModal
        isOpen={false}
        onClose={mockOnClose}
        form={mockForm}
        onFormChange={mockOnChange}
        onSave={mockOnSave}
        editingUser={null}
      />
    );

    expect(container.querySelector('.modal-overlay')).not.toBeInTheDocument();
  });

  it('should render when open', () => {
    const mockOnChange = vi.fn();
    const mockOnSave = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        form={mockForm}
        onFormChange={mockOnChange}
        onSave={mockOnSave}
        editingUser={null}
      />
    );

    expect(screen.getByText('Add New User')).toBeInTheDocument();
  });

  it('should show "Edit User" title when editing', () => {
    const mockOnChange = vi.fn();
    const mockOnSave = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        form={mockForm}
        onFormChange={mockOnChange}
        onSave={mockOnSave}
        editingUser={mockUser}
      />
    );

    expect(screen.getByText('Edit User')).toBeInTheDocument();
  });

  it('should render form fields', () => {
    const mockOnChange = vi.fn();
    const mockOnSave = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        form={mockForm}
        onFormChange={mockOnChange}
        onSave={mockOnSave}
        editingUser={null}
      />
    );

    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getAllByRole('combobox').length).toBeGreaterThan(0);
  });

  it('should populate form fields with initial values', () => {
    const mockOnChange = vi.fn();
    const mockOnSave = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        form={mockForm}
        onFormChange={mockOnChange}
        onSave={mockOnSave}
        editingUser={null}
      />
    );

    const nameInput = screen.getByPlaceholderText('Enter name') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('Enter email') as HTMLInputElement;

    expect(nameInput.value).toBe('Test User');
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should call onChange when typing in name field', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    const mockOnSave = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        form={{ ...mockForm, name: '' }}
        onFormChange={mockOnChange}
        onSave={mockOnSave}
        editingUser={null}
      />
    );

    const nameInput = screen.getByPlaceholderText('Enter name');
    await user.type(nameInput, 'A');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should call onSave when clicking save button', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    const mockOnSave = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        form={mockForm}
        onFormChange={mockOnChange}
        onSave={mockOnSave}
        editingUser={null}
      />
    );

    const saveButton = screen.getByText('Add User');
    await user.click(saveButton);

    expect(mockOnSave).toHaveBeenCalled();
  });

  it('should call onClose when clicking cancel button', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    const mockOnSave = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        form={mockForm}
        onFormChange={mockOnChange}
        onSave={mockOnSave}
        editingUser={null}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should show "Update User" button text when editing', () => {
    const mockOnChange = vi.fn();
    const mockOnSave = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <UserModal
        isOpen={true}
        onClose={mockOnClose}
        form={mockForm}
        onFormChange={mockOnChange}
        onSave={mockOnSave}
        editingUser={mockUser}
      />
    );

    expect(screen.getByText('Update User')).toBeInTheDocument();
  });
});
