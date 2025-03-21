import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Calendar, Tag, CheckCircle } from "lucide-react";
import { Select, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Personal");
  const [dueDate, setDueDate] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, category, dueDate, completed: false }]);
      setNewTask("");
      setCategory("Personal");
      setDueDate(null);
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">📌 To-Do List</h2>
      <div className="flex gap-2 mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Tambahkan tugas baru..."
          className="flex-grow rounded-lg px-4 py-2 border border-gray-300"
        />
        <Select value={category} onValueChange={setCategory} className="w-32">
          <SelectItem value="Personal">🎭 Personal</SelectItem>
          <SelectItem value="Work">💼 Work</SelectItem>
          <SelectItem value="Shopping">🛍 Shopping</SelectItem>
        </Select>
        <DatePicker value={dueDate} onValueChange={setDueDate} />
        <Button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Tambah
        </Button>
      </div>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <Card key={index} className={`p-4 flex justify-between items-center rounded-lg shadow-md transition-all ${task.completed ? 'bg-gray-100' : 'bg-white'}`}>
            <CardContent className="flex items-center gap-3">
              <button onClick={() => toggleTask(index)} className="text-blue-500 hover:text-green-500">
                <CheckCircle size={22} className={task.completed ? "text-green-500" : "text-gray-300"} />
              </button>
              <div>
                <span className={`text-lg font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                  {task.text}
                </span>
                <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <Tag size={14} /> {task.category} | <Calendar size={14} /> {task.dueDate || "No due date"}
                </div>
              </div>
            </CardContent>
            <Button variant="ghost" onClick={() => deleteTask(index)} className="text-red-500 hover:bg-red-100 p-2 rounded-full">
              <Trash2 size={18} />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
