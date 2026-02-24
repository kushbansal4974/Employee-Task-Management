export const adminDashboard = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "completed",
    });

    const pendingTasks = await Task.countDocuments({
      status: "pending",
    });

    const totalUsers = await User.countDocuments({
      role: "employee",
    });

    return res.status(200).json({
      success: true,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
        totalUsers,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const employeeDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({
      assignedTo: userId,
    });

    const completedTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "completed",
    });

    const pendingTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "pending",
    });

    const inProgressTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "in-progress",
    });

    return res.status(200).json({
      success: true,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
      },
    });

  } catch (error) {
    console.log("Employee Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};