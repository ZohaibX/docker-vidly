import * as React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GetAllTasks } from "./../GraphQL/Queries/getAllTasks";
import { CreateTask } from "./../GraphQL/Mutations/createTask";
import { DeleteTask } from "../GraphQL/Mutations/deleteTask";
import { ChangeTitle } from "./../GraphQL/Mutations/updateTaskTitle";

export interface TasksProps {}

const Tasks: React.SFC<TasksProps> = (props: TasksProps) => {
  const [title, setTitle] = React.useState("");

  const { data, loading, error }: any = useQuery(GetAllTasks); // Query Declaration

  const [
    createTask,
    { data: data_1, loading: loading_1, error: error_1 },
  ]: any = useMutation(CreateTask); //  CreateTask Mutation Declaration

  const [
    deleteTask,
    { data: data_2, loading: loading_2, error: error_2 },
  ]: any = useMutation(DeleteTask); //  DeleteTask Mutation Declaration

  const [
    changeTitle,
    { data: data_3, loading: loading_3, error: error_3 },
  ]: any = useMutation(ChangeTitle); //  ChangeTitle Mutation Declaration

  const deleteTheTask = async (id: string) => {
    // console.log(id, typeof id, typeof JSON.stringify(id));
    console.log(JSON.stringify(id), typeof JSON.stringify(id));
    try {
      //  Delete Mutation Execution
      const deletedTask = await deleteTask({
        variables: { id },
        refetchQueries: [{ query: GetAllTasks }],
      });
      console.log(deletedTask);
    } catch (error) {
      return error;
    }
  };

  const changeTaskName = async (id: any) => {
    try {
      //  Delete Mutation Execution
      const updatedTaskTitle = await changeTitle({
        variables: { id, title },
        refetchQueries: [{ query: GetAllTasks }],
      });
      setTitle("");
    } catch (error) {
      return error;
    }
  };

  const showAllTasks = () => {
    if (loading) return <p>Loading ... </p>;
    if (error) return <p>Error ... </p>;
    // Query Usage/Execution -- only this is how this executes
    return (
      <ul>
        {data.getAllTasks.map((item: any) => (
          // console.log(item)
          <li key={item._id}>
            <span onClick={() => deleteTheTask(item._id)}>{item.title}</span>
            <span>
              <button
                onClick={() => changeTaskName(item._id)}
                className="btn btn-warning"
              >
                Update
              </button>
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const submitTask = async (e: any) => {
    e.preventDefault();

    // CreateTask mutation Usage
    try {
      const createdTask = await createTask({
        variables: { title },
        refetchQueries: [{ query: GetAllTasks }],
      });

      setTitle("");
    } catch (e) {}
  };

  return (
    <div className="">
      {showAllTasks()}
      <h1 className="text-center my-2 font-weight-bolder">Create Task</h1>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <form className=" mt-5 ml-5" onSubmit={submitTask}>
            <div className="form-group">
              <label htmlFor="email">Task Title</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Task Title"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
              <button type="submit" className="btn btn-primary my-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
