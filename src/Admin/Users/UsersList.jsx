import React, { useState, useEffect, useCallback } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Alert,
  Box,
  InputAdornment,
} from "@mui/material";
import { FiUser } from "react-icons/fi";
import { Edit, Delete, Add, Search, Close } from "@mui/icons-material";
import { motion } from "framer-motion";

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Pending":
      return "warning";
    case "Inactive":
      return "error";
    default:
      return "default";
  }
};

const getDefaultUsers = () => [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    role: "Admin",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=john",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    role: "User",
    status: "Pending",
    avatar: "https://i.pravatar.cc/150?u=jane",
  },
];

const DeleteConfirmation = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to delete this user?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

const UserForm = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    user || {
      id: Date.now(),
      name: "",
      email: "",
      phone: "",
      role: "User",
      status: "Active",
      password: "",
      confirmPassword: "",
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
    }
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.status) newErrors.status = "Status is required";

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Validate confirm password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent dividers>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2 }}
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            // onChange={handleChange}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            required
            inputProps={{
              pattern: "[0-9]{10}",
              title: "Phone number must be 10 digits",
            }}
          />

          <Select
            name="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            error={!!errors.role}
            fullWidth
            required
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>

          <Select
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            error={!!errors.status}
            fullWidth
            required
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>

          {/* Password fields */}
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const UserList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem("users")) || getDefaultUsers()
  );
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    setFilteredUsers(
      users
        .filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        )
        .filter((user) => (filterStatus ? user.status === filterStatus : true))
    );
  }, [users, search, filterStatus]);

  const saveUser = useCallback((user) => {
    setUsers((prev) => {
      const exists = prev.find((u) => u.id === user.id);
      const updated = exists
        ? prev.map((u) => (u.id === user.id ? user : u))
        : [...prev, user];
      setSnackbar({
        open: true,
        message: `User ${exists ? "updated" : "added"} successfully!`,
        severity: "success",
      });
      return updated;
    });
  }, []);

  const handleDelete = useCallback((id) => {
    const userToDelete = users.find((user) => user.id === id);

    // تحقق من إذا كان المستخدم هو الأدمن
    if (userToDelete.role.trim().toLowerCase() === "admin") {
      setSnackbar({
        open: true,
        message: "Cannot delete the admin!",
        severity: "error",
      });
      return; // لا تتابع الحذف
    }

    setUsers((prev) => prev.filter((user) => user.id !== id));
    setSnackbar({
      open: true,
      message: "User deleted!",
      severity: "success",
    });
    setDeleteOpen(false);
  }, []);

  return (
    <Paper
      sx={{ p: 3, borderRadius: 4, boxShadow: 3, overflow: "hidden", mt: 4 }}
    >
      <Box display="flex" flexDirection="column" gap={2} mb={2}>
        <FiUser className="text-blue-600" />
        <Typography variant="h4" fontWeight="bold">
          User Account Management
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="flex-end"
        >
          <TextField
            placeholder="Search users..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            fullWidth={isMobile}
          />

          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            displayEmpty
            size="small"
            fullWidth={isMobile}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setSelectedUser(null);
              setOpenForm(true);
            }}
            fullWidth={isMobile}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {isMobile ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          {filteredUsers.map((user) => (
            <Paper
              key={user.id}
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{ p: 2, borderRadius: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  "&:hover": { boxShadow: 2 },
                }}
              >
                <Avatar src={user.avatar} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight="bold">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Typography variant="body2">{user.phone}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Chip
                  label={user.status}
                  color={getStatusColor(user.status)}
                  size="small"
                />
                <Box>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenForm(true);
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => {
                      setUserToDelete(user.id);
                      setDeleteOpen(true);
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{ "&:hover": { backgroundColor: "action.hover" } }}
                >
                  <TableCell>
                    <Avatar src={user.avatar} />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status)}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenForm(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setUserToDelete(user.id);
                          setDeleteOpen(true);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {openForm && (
        <UserForm
          user={selectedUser}
          onSave={saveUser}
          onClose={() => {
            setOpenForm(false);
            setSelectedUser(null);
          }}
        />
      )}

      <DeleteConfirmation
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => handleDelete(userToDelete)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default UserList;
