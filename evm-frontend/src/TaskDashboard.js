// src/TaskDashboard.js
import React, { useState, useEffect } from "react";

// Dummy tasks data (replace with dynamic data from your backend/blockchain as needed)
const dummyTasks = [
  {
    id: 1,
    title: "Win Your First Battle",
    description: "Engage in a battle and win to complete this quest.",
    reward: "NFT Sword",
    progress: 0,
    goal: 1,
  },
  {
    id: 2,
    title: "Battle Marathon",
    description: "Participate in 5 battles.",
    reward: "NFT Shield",
    progress: 0,
    goal: 5,
  },
  {
    id: 3,
    title: "Social Butterfly",
    description: "Send 10 chat messages.",
    reward: "NFT Chat Badge",
    progress: 0,
    goal: 10,
  },
];

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);

  // Simulate fetching tasks from a backend or blockchain
  useEffect(() => {
    // Simulate a delay, then load tasks
    setTimeout(() => {
      setTasks(dummyTasks);
    }, 500);
  }, []);

  // Handler to "accept" a task (for now, simply log or update UI)
  const acceptTask = (taskId) => {
    // In a full implementation, mark the task as accepted in the backend
    console.log("Task accepted:", taskId);
    // Optionally update the task status in the UI
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, accepted: true } : task
      )
    );
  };

  // Handler to simulate task progress (for demo purposes)
  const simulateProgress = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId && task.progress < task.goal) {
          return { ...task, progress: task.progress + 1 };
        }
        return task;
      })
    );
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Tasks & Quests</h2>
      {tasks.length === 0 ? (
        <p>Loading tasks...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>
                Reward: <strong>{task.reward}</strong>
              </p>
              <p>
                Progress: {task.progress} / {task.goal}
              </p>
              {!task.accepted ? (
                <button onClick={() => acceptTask(task.id)}>Accept Task</button>
              ) : (
                <button onClick={() => simulateProgress(task.id)}>
                  Simulate Progress
                </button>
              )}
              {task.progress === task.goal && (
                <p style={{ color: "green" }}>Task Completed!</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskDashboard;
