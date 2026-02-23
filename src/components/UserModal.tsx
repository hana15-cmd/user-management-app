import type { User } from "../types";
import "../styles/UserModal.css";

interface UserModalProps {
  isOpen: boolean;
  editingUser: User | null;
  form: {
    name: string;
    email: string;
    role: "admin" | "viewer";
    status: "Active" | "Inactive";
  };
  onFormChange: (field: string, value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function UserModal({
  isOpen,
  editingUser,
  form,
  onFormChange,
  onSave,
  onClose,
}: UserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          {editingUser ? "Edit User" : "Add New User"}
        </h2>
        
        <div className="modal-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => onFormChange("name", e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => onFormChange("email", e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={form.role}
              onChange={(e) => onFormChange("role", e.target.value)}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={form.status}
              onChange={(e) => onFormChange("status", e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onSave} className="btn-save">
            {editingUser ? "Update" : "Add"}
          </button>
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
