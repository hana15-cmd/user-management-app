import type { User } from "../types";
import "../styles/UserStats.css";

interface UserStatsProps {
  users: User[];
}

export default function UserStats({ users }: UserStatsProps) {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-label">Total Users</div>
        <div className="stat-value total">{users.length}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Active Users</div>
        <div className="stat-value active">
          {users.filter(u => u.status === "Active").length}
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Admins</div>
        <div className="stat-value admins">
          {users.filter(u => u.role === "admin").length}
        </div>
      </div>
    </div>
  );
}
