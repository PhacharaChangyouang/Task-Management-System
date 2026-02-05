function getStatusClass(status) {
  if (status === "To Do") return "todo";
  if (status === "In Progress") return "in-progress";
  if (status === "Done") return "done";
  return "";
}
