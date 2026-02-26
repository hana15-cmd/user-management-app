import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('User Management App', () => {
  it('should render the app title', () => {
    render(<App />);
    expect(screen.getByText('User Management Demo')).toBeInTheDocument();
  });

  it('should render role switcher', () => {
    render(<App />);
    expect(screen.getByText('Logged in as:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render UserManagement component', () => {
    render(<App />);
    expect(screen.getByText('User Management')).toBeInTheDocument();
  });

  it('should render UserStats component', () => {
    render(<App />);
    expect(screen.getByText('Total Users')).toBeInTheDocument();
  });

  it('should render UserTable component', () => {
    render(<App />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
  });

  it('should have initial user selection', () => {
    render(<App />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBeTruthy();
  });

  it('should switch between users', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    
    // Should have multiple users to select
    expect(options.length).toBeGreaterThan(1);
    
    // Switch to second user
    await user.selectOptions(select, options[1].getAttribute('value')!);
    
    // Verify the select value changed
    expect((select as HTMLSelectElement).value).toBe(options[1].getAttribute('value'));
  });
});
