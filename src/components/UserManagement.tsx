import { useState } from "react";
import type { User, AuthUser } from "../types";
import { generateDummyUsers } from "../data/mockData";
import UserStats from "./UserStats";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import "../styles/userManagement.css";

interface UserManagementProps {
  currentUser: AuthUser;
}

export default function UserManagement({ currentUser }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>(generateDummyUsers());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "viewer" as "admin" | "viewer",
    status: "Active" as "Active" | "Inactive",
  });

  const isAdmin = currentUser.role === "admin";

  const handleFormChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleAdd = () => {
    const newUser: User = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      role: form.role,
      status: form.status,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers([newUser, ...users]);
    closeModal();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...form }
          : u
      ));
      closeModal();
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    setForm({
      name: "",
      email: "",
      role: "viewer",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setForm({
      name: "",
      email: "",
      role: "viewer",
      status: "Active",
    });
  };

  return (
    <div className="user-management">
      <div className="um-header">
        <h1 className="um-title">User Management</h1>
        <p className="um-subtitle">Manage system users and permissions</p>
      </div>

      <UserStats users={users} />

      {isAdmin && (
        <div className="um-add-button-container">
          <button onClick={openAddModal} className="btn-add-user">
            + Add User
          </button>
        </div>
      )}

      <UserTable
        users={users}
        isAdmin={isAdmin}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserModal
        isOpen={isModalOpen && isAdmin}
        editingUser={editingUser}
        form={form}
        onFormChange={handleFormChange}
        onSave={editingUser ? handleUpdate : handleAdd}
        onClose={closeModal}
      />

      {!isAdmin && (
        <div className="viewer-notice">
          <p className="viewer-notice-text">
            ℹ️ You are viewing as a <strong>Viewer</strong>. Only Admins can add, edit, or delete users.
          </p>
        </div>
      )}
    </div>
  );
}
