import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const schema = {
  $defs: {
    Task: {
      properties: {
        task_name: { title: "Name", type: "string" },
        task_info: { title: "Task Info", type: "string" },
      },
      required: ["task_name", "task_info"],
      title: "Task",
      type: "object",
    },
  },
  properties: {
    pet_name: { title: "Pet Name", type: "string" },
    tasks: {
      items: { $ref: "#/$defs/Task" },
      title: "Tasks",
      type: "array",
    },
  },
  required: ["pet_name", "tasks"],
  title: "Pet Tasks",
  type: "object",
};

type Task = {
  task_name: string;
  task_info: string;
};

class Pet {
  pet_name: string;
  tasks: Task[];

  constructor(pet_name: string, tasks: Task[]) {
    this.pet_name = pet_name;
    this.tasks = tasks;
  }
}

export async function getTask(pet_name: string) {
  const jsonSchema = JSON.stringify(schema, null, 4);
  const chat_completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a pet care database that outputs tasks for pet owners in JSON.\n'The JSON object must use the schema: ${jsonSchema}`,
      },
      {
        role: "user",
        content: `Fetch a task for ${pet_name}`,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    stream: false,
    response_format: { type: "json_object" },
  });
  return Object.assign(
    new Pet("", []),
    chat_completion.choices[0].message.content
      ? JSON.parse(chat_completion.choices[0].message.content)
      : {}
  );
}

/* ---- Testing ---- */

// export async function main() {
//   const task = await getTask("Rover");
//   console.log(task);
// }

// main();
