import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Tooltip,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Edit, Delete, Add, WarningRounded } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle"; // Optional: Add a FAB icon for mobile
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusColors = {
  Confirmed: { bg: "#e8f5e9", color: "#2e7d32", icon: "✅" },
  Pending: { bg: "#fff3e0", color: "#ef6c00", icon: "⏳" },
  Cancelled: { bg: "#ffebee", color: "#d32f2f", icon: "❌" },
};

const ReservationsDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [rows, setRows] = useState([
    { id: 1, name: "John Doe", date: "2025-02-20", status: "Confirmed" },
    { id: 2, name: "Jane Smith", date: "2025-02-22", status: "Pending" },
    { id: 3, name: "Michael Brown", date: "2025-02-25", status: "Cancelled" },
  ]);

  const [editData, setEditData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isNew, setIsNew] = useState(false);

  // Toast configuration
  const showToast = (message, type = "success") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // Handle Add New Reservation
  const handleAddNew = () => {
    const newId = rows.length ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    setEditData({
      id: newId,
      name: "",
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    });
    setIsNew(true);
    setOpenDialog(true);
  };

  // Handle Edit
  const handleEditClick = (row) => {
    setEditData(row);
    setIsNew(false);
    setOpenDialog(true);
  };

  // Handle Delete Confirmation
  const confirmDelete = (id) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  // Final Delete Action
  const handleDelete = () => {
    setRows(rows.filter((row) => row.id !== selectedId));
    setOpenDeleteDialog(false);
    showToast("Reservation deleted successfully!", "success");
  };

  // Save Data
  const handleSave = () => {
    if (isNew) {
      setRows([...rows, editData]);
      showToast("Reservation added successfully!", "success");
    } else {
      setRows(rows.map((row) => (row.id === editData.id ? editData : row)));
      showToast("Reservation updated successfully!", "success");
    }
    setOpenDialog(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Guest Name",
      flex: 1,
      minWidth: 180,
      headerAlign: "left",
      renderCell: (params) => (
        <Typography fontWeight="500">{params.value}</Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            // bgcolor: theme.palette.grey[100],
            // px: 1.5,
            // py: 0.5,
            borderRadius: 1,
          }}
        >
          {new Date(params.value).toLocaleDateString()}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {statusColors[params.value].icon}
              {params.value}
            </Box>
          }
          sx={{
            backgroundColor: statusColors[params.value].bg,
            color: statusColors[params.value].color,
            fontWeight: 600,
            width: 110,
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => handleEditClick(params.row)}
              sx={{
                "&:hover": {
                  bgcolor: theme.palette.primary.light,
                  transform: "scale(1.1)",
                },
                "&:hover svg": {
                  color: "white", // Change icon color to white on hover
                },
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => confirmDelete(params.id)}
              sx={{
                "&:hover": { bgcolor: theme.palette.error.light },
                "&:hover svg": {
                  color: "white", // Change icon color to white on hover
                },
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Adjust column visibility and layout based on screen size
  const mobileColumns = columns.map((col) => ({
    ...col,
    width: isMobile ? 120 : col.width, // Make columns more compact on mobile
    hide: isMobile && col.field === "someColumnToHide", // Hide some columns on mobile
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "auto",
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: 4,
        boxShadow: theme.shadows[3],
        p: 3,
        mt: 4,
      }}
    >
      <ToastContainer />

      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center",
          borderBottom: `2px solid ${theme.palette.divider}`,
          pb: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <span>🎯</span>
          Reservations Manager
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddNew}
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            py: 1,
          }}
          size={isMobile ? "small" : "medium"}
        >
          New Reservation
        </Button>
      </Box>

      {/* Responsive Cards Grid */}

      {isMobile && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {rows.map((row) => (
            <Grid item xs={12} sm={6} md={4} key={row.id}>
              <Box
                sx={{
                  bgcolor: theme.palette.background.default,
                  padding: 2.5,
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {row.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      bgcolor: theme.palette.grey[100],
                      px: 1.2,
                      py: 0.4,
                      borderRadius: 1,
                    }}
                  >
                    📅 {new Date(row.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Chip
                  label={
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      {statusColors[row.status].icon}
                      {row.status}
                    </Box>
                  }
                  sx={{
                    width: "100%",
                    justifyContent: "flex-start",
                    backgroundColor: statusColors[row.status].bg,
                    color: statusColors[row.status].color,
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                    gap: 1,
                  }}
                >
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(row)}
                      sx={{
                        "&:hover": {
                          bgcolor: theme.palette.primary.light,
                          transform: "scale(1.1)",
                        },
                        "&:hover svg": {
                          color: "white", // Change icon color to white on hover
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => confirmDelete(row.id)}
                      sx={{
                        "&:hover": {
                          bgcolor: theme.palette.error.light,
                          transform: "scale(1.1)",
                        },
                        "&:hover svg": {
                          color: "white", // Change icon color to white on hover
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Data Grid for Mobile */}
      {/* {isMobile && (
        <Box sx={{ overflowX: "auto", marginBottom: "56px" }}>
          {" "}
          Add horizontal scrolling for better mobile viewing
          <DataGrid
            rows={rows}
            columns={mobileColumns}
            pageSize={5} // Smaller page size for mobile
            disableSelectionOnClick
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDataGrid-columnHeader": {
                bgcolor: theme.palette.grey[200],
                fontWeight: 600,
              },
              "& .MuiDataGrid-cell": {
                display: "flex",
                justifyContent: "space-between", // More spacing for mobile
                gap: 2,
              },
              "& .MuiDataGrid-footerContainer": {
                mt: 6, // Add margin for mobile footer
              },
            }}
          />
        </Box>
      )} */}
      {/* Floating Action Button (FAB) for Mobile */}
      {useMediaQuery(theme.breakpoints.down("sm")) && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 9999,
          }}
        >
          <button
            style={{
              backgroundColor: theme.palette.primary.main,
              border: "none",
              borderRadius: "50%",
              padding: "16px",
              color: "white",
              fontSize: "24px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
            // onClick={() => console.log("Add New Reservation")}
            onClick={handleAddNew}
          >
            <AddCircleIcon />
          </button>
        </Box>
      )}

      {/* عرض الجدول فقط في الشاشات الكبيرة */}
      {/* Data Grid for Desktop */}
      {!isMobile && (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[6, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 6 } } }}
          sx={{
            display: { xs: "none", sm: "block" },
            // Column headers styling
            "& .MuiDataGrid-columnHeader": {
              bgcolor: theme.palette.grey[100],
              fontWeight: 700,
            },
            // Adjust spacing inside cells
            "& .MuiDataGrid-cell": {
              // py: 2, // Increase vertical padding inside cells
              // px: 2, // Increase horizontal padding inside cells
              display: "flex",
              alignItems: "center", // Vertically center the content
              justifyContent: "center", // Horizontally center the content
              gap: 2, // Adjust row height
            },
            "& .MuiDataGrid-row": {
              // minHeight: "60px", // Set minimum row height // Min row height for desktop
            },
            // Row hover effect
            "& .MuiDataGrid-row:hover": {
              bgcolor: theme.palette.action.hover,
            },
            // ✅ Add margin between DataGrid and pagination footer
            "& .MuiDataGrid-footerContainer": {
              mt: 12, // Adds top margin between DataGrid and pagination footer
            },
          }}
        />
      )}

      {/* Edit/Add Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ bgcolor: theme.palette.primary.main, color: "white" }}
        >
          {isNew ? "➕ Add New Reservation" : "✏️ Edit Reservation"}
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Box sx={{ display: "grid", gap: 2.5, mt: 3 }}>
            <TextField
              label="Guest Name"
              value={editData?.name || ""}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              fullWidth
              required
              variant="outlined"
              error={!editData?.name}
              helperText={!editData?.name && "Name is required"}
              margin="dense"
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={editData?.date || ""}
              onChange={(e) =>
                setEditData({ ...editData, date: e.target.value })
              }
              fullWidth
              required
              variant="outlined"
              margin="dense"
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              select
              label="Status"
              value={editData?.status || "Pending"}
              onChange={(e) =>
                setEditData({ ...editData, status: e.target.value })
              }
              fullWidth
              required
              variant="outlined"
              SelectProps={{ native: true }}
              margin="dense"
              size={isMobile ? "small" : "medium"}
            >
              {Object.keys(statusColors).map((status) => (
                <option key={status} value={status}>
                  {statusColors[status].icon} {status}
                </option>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
            size={isMobile ? "small" : "medium"}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!editData?.name || !editData?.date}
            sx={{ borderRadius: 2 }}
            size={isMobile ? "small" : "medium"}
          >
            {isNew ? "Create Reservation" : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningRounded color="error" />
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this reservation? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            startIcon={<Delete />}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReservationsDashboard;
