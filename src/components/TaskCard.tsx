export default function TaskCard({ task }) {
    return (
      <div className="p-4 bg-gray-100 shadow rounded">
        <h3 className="text-xl">{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500">{task.status}</p>
      </div>
    );
  }
  