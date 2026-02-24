import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserStats from '../components/UserStats';
import type { User } from '../types';

const createMockUsers = (count: number, activeCount: number, adminCount: number): User[] => {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@test.com`,
      role: i < adminCount ? 'admin' : 'viewer',
      status: i < activeCount ? 'Active' : 'Inactive',
      createdAt: '2026-02-24',
    });
  }
  return users;
};

describe('UserStats', () => {
  it('should render all stat cards', () => {
    const users = createMockUsers(100, 85, 10);
    render(<UserStats users={users} />);
    
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('Admins')).toBeInTheDocument();
  });

  it('should display total users count', () => {
    const users = createMockUsers(100, 85, 10);
    render(<UserStats users={users} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should display active users count', () => {
    const users = createMockUsers(100, 85, 10);
    render(<UserStats users={users} />);
    expect(screen.getByText('85')).toBeInTheDocument();
  });

  it('should display admin users count', () => {
    const users = createMockUsers(100, 85, 10);
    render(<UserStats users={users} />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should handle zero values', () => {
    const users: User[] = [];
    render(<UserStats users={users} />);
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThanOrEqual(3);
  });

  it('should render stats container', () => {
    const users: User[] = [];
    const { container } = render(<UserStats users={users} />);
    expect(container.querySelector('.stats-container')).toBeInTheDocument();
  });
});
