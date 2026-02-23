import type { User } from "../types";
import "../styles/UserTable.css";

interface UserTableProps {
  users: User[];
  isAdmin: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({ users, isAdmin, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created At</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="user-name">{user.name}</td>
              <td className="user-email">{user.email}</td>
              <td>
                <span className={`role-badge ${user.role === "admin" ? "role-admin" : "role-viewer"}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <span className={user.status === "Active" ? "status-active" : "status-inactive"}>
                  {user.status}
                </span>
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              {isAdmin && (
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(user)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
