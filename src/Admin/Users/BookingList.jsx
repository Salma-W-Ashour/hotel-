import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
  Paper,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import {
  Add,
  Search,
  CreditCard,
  Edit,
  Delete,
  AttachMoney,
  CalendarToday,
  Hotel,
  People,
} from "@mui/icons-material";
import { FaPaypal } from "react-icons/fa";

// Keep BookingForm component the same as before
const BookingForm = ({ booking, onSave, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [formData, setFormData] = useState(
    booking || {
      id: Date.now(),
      bookingDate: "",
      checkInDate: "",
      roomType: "Single Room",
      numGuests: 1,
      paymentMethod: "Credit Card",
      specialRequests: "",
      hotelLocation: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (booking) setFormData(booking);
  }, [booking]);

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.bookingDate) newErrors.bookingDate = "Required";
    else if (formData.bookingDate < today)
      newErrors.bookingDate = "Cannot be in the past";

    if (!formData.checkInDate) newErrors.checkInDate = "Required";
    else if (formData.checkInDate <= formData.bookingDate)
      newErrors.checkInDate = "Must be after booking date";

    if (!formData.roomType?.trim()) newErrors.roomType = "Required";
    if (!formData.numGuests || formData.numGuests <= 0)
      newErrors.numGuests = "Invalid number";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Required";
    if (!formData.hotelLocation?.trim()) newErrors.hotelLocation = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ typography: "h6", fontWeight: 600 }}>
        {booking ? "Edit Booking" : "New Booking"}
      </DialogTitle>

      <DialogContent dividers>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2 }}
        >
          {/* Form fields with enhanced validation */}
          <TextField
            label="Booking Date"
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            error={!!errors.bookingDate}
            helperText={errors.bookingDate}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Check-in Date"
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            error={!!errors.checkInDate}
            helperText={errors.checkInDate}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Room Type"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            error={!!errors.roomType}
            helperText={errors.roomType}
            fullWidth
            required
          />
          <TextField
            label="Number of Guests"
            type="number"
            name="numGuests"
            value={formData.numGuests}
            onChange={handleChange}
            error={!!errors.numGuests}
            helperText={errors.numGuests}
            fullWidth
            required
          />
          <TextField
            label="Special Requests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            fullWidth
          />
          <Select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            error={!!errors.paymentMethod}
            fullWidth
            required
          >
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="PayPal">PayPal</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
          </Select>
          <TextField
            label="Hotel Location"
            name="hotelLocation"
            value={formData.hotelLocation}
            onChange={handleChange}
            error={!!errors.hotelLocation}
            helperText={errors.hotelLocation}
            fullWidth
            required
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          {isLoading ? "Processing..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const MobileBookingCard = ({ booking, onEdit, onDelete, formatDate }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            {booking.roomType}
          </Typography>
          <Chip
            label={booking.hotelLocation}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CalendarToday fontSize="small" color="action" />
          <Typography variant="body2">
            {formatDate(booking.checkInDate)}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <People fontSize="small" color="action" />
          <Typography variant="body2">{booking.numGuests} Guests</Typography>
        </Box>

        {booking.specialRequests && (
          <Typography variant="body2" color="text.secondary" mb={1}>
            Requests: {booking.specialRequests}
          </Typography>
        )}

        <Box display="flex" alignItems="center" gap={1}>
          {booking.paymentMethod === "Credit Card" && (
            <CreditCard fontSize="small" color="action" />
          )}
          {booking.paymentMethod === "PayPal" && (
            <FaPaypal
              style={{ fontSize: "1rem", color: theme.palette.text.secondary }}
            />
          )}
          {booking.paymentMethod === "Cash" && (
            <AttachMoney fontSize="small" color="action" />
          )}
          <Typography variant="body2">{booking.paymentMethod}</Typography>
        </Box>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={() => onEdit(booking)} size="small">
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => onDelete(booking.id)}
          color="error"
          size="small"
        >
          <Delete fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const BookingList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Keep existing state and logic the same
  const [bookings, setBookings] = useState(
    () => JSON.parse(localStorage.getItem("bookings")) || getDefaultBookings()
  );
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBooking, setCurrentBooking] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    bookingId: null,
  });

  const handleDelete = useCallback((id) => {
    setDeleteConfirmation({
      open: true,
      bookingId: id,
    });
  }, []);

  const handleConfirmDelete = () => {
    setBookings((prev) =>
      prev.filter((booking) => booking.id !== deleteConfirmation.bookingId)
    );
    setSnackbar({
      open: true,
      message: "Booking deleted successfully!",
      severity: "success",
    });
    setDeleteConfirmation({ open: false, bookingId: null });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ open: false, bookingId: null });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = bookings.filter((booking) =>
        Object.values(booking).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredBookings(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, bookings]);

  const handleSave = useCallback(
    async (newBooking) => {
      try {
        setBookings((prev) =>
          currentBooking
            ? prev.map((b) => (b.id === currentBooking.id ? newBooking : b))
            : [...prev, newBooking]
        );
        setSnackbar({
          open: true,
          message: currentBooking ? "Booking updated!" : "New booking added!",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Operation failed",
          severity: "error",
        });
      }
      setDialogOpen(false);
    },
    [currentBooking]
  );

  const handleEditClick = (booking) => {
    setCurrentBooking(booking);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    // handleDelete(id);
    setDeleteConfirmation({
      open: true,
      bookingId: id,
    });
  };

  return (
    <Paper
      sx={{
        m: { xs: 1, sm: 3 },
        p: { xs: 1, sm: 3 },
        borderRadius: 4,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      {/* Keep header section the same */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          Booking Manager
        </Typography>

        <Box
          sx={{ display: "flex", gap: 2, width: { xs: "100%", sm: "auto" } }}
          style={{ flex: "flex-wrap" }}
        >
          <TextField
            fullWidth={isMobile}
            placeholder="Search bookings..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <Search fontSize="small" sx={{ mr: 1 }} />,
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
          />

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setCurrentBooking(null);
              setDialogOpen(true);
            }}
            sx={{ whiteSpace: "nowrap" }}
            style={{ width: isMobile ? "70%" : "" }}
          >
            New Booking
          </Button>
        </Box>
      </Box>

      {isMobile ? (
        <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
          {filteredBookings.map((booking) => (
            <MobileBookingCard
              key={booking.id}
              booking={booking}
              // onEdit={(b) => {setCurrentBooking(b);setDialogOpen(true);}}
              // onDelete={handleDelete}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              formatDate={formatDate}
            />
          ))}
        </Box>
      ) : (
        <TableContainer
          sx={{
            maxHeight: "70vh",
            overflow: "auto",
            "&::-webkit-scrollbar": { height: 8 },
          }}
        >
          <Table
            stickyHeader
            size="small"
            sx={{
              minWidth: 800,
              width: "100%",
              tableLayout: "auto",
            }}
          >
            <TableHead>
              <TableRow>
                {[
                  "Booking Date",
                  "Check-in Date",
                  "Room Type",
                  "Guests",
                  "Special Requests",
                  "Payment Method",
                  "Location",
                  "Actions",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: 700,
                      bgcolor: "background.paper",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow hover key={booking.id}>
                  <TableCell>{formatDate(booking.bookingDate)}</TableCell>
                  <TableCell>{formatDate(booking.checkInDate)}</TableCell>
                  <TableCell>{booking.roomType}</TableCell>
                  <TableCell align="center">{booking.numGuests}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Tooltip title={booking.specialRequests || "No requests"}>
                      <Typography noWrap variant="body2">
                        {booking.specialRequests || "-"}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      {booking.paymentMethod === "Credit Card" && (
                        <CreditCard fontSize="small" />
                      )}
                      {booking.paymentMethod === "PayPal" && (
                        <FaPaypal style={{ fontSize: "1rem" }} />
                      )}
                      {booking.paymentMethod === "Cash" && (
                        <AttachMoney fontSize="small" />
                      )}
                      <span>{booking.paymentMethod}</span>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={booking.hotelLocation}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => handleEditClick(booking)}
                          size="small"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(booking.id)}
                          size="small"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {dialogOpen && (
        <BookingForm
          booking={currentBooking}
          onSave={handleSave}
          onClose={() => setDialogOpen(false)}
        />
      )}

      {/* Keep dialog and snackbar components the same */}
      {/* Dialog and Snackbar components */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <Dialog
        open={deleteConfirmation.open}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this booking?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

// Keep helper functions and default data the same

// Helper functions and default data
const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getDefaultBookings = () => [
  /* sample data */

  {
    id: 1,
    userId: 1,
    bookingDate: "2025-03-10",
    checkInDate: "2025-03-15",
    roomType: "Single Room",
    numGuests: 2,
    paymentMethod: "Credit Card",
    specialRequests: "Early check-in",
    bookingStatus: "Active",
    reviews: "4.5/5",
    hotelLocation: "New York, USA",
  },
  {
    id: 2,
    userId: 2,
    bookingDate: "2025-03-12",
    checkInDate: "2025-03-17",
    roomType: "Double Room",
    numGuests: 4,
    paymentMethod: "PayPal",
    specialRequests: "Late checkout",
    bookingStatus: "Pending",
    reviews: "4.0/5",
    hotelLocation: "Los Angeles, USA",
  },
];

export default BookingList;
