export const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: Object.values(err.errors)[0].message });
  }
  if (err.name === "CastError") return res.status(400).json({ message: "Invalid ID" });
  if (err.name === "MulterError") return res.status(400).json({ message: err.message });
  res.status(err.statusCode || 500).json({ message: err.message || "Server error" });
};