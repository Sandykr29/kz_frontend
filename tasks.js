// ...existing code...

function Task({ task }) {
    const taskClass = task.completed ? 'completed-task' : 'pending-task';
    return (
        <div className={`task ${taskClass}`}>
            {/* ...existing code... */}
        </div>
    );
}

// ...existing code...

function TaskList({ tasks, filter }) {
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
    });

    return (
        <div className="task-list">
            {filteredTasks.map(task => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
}

// ...existing code...
