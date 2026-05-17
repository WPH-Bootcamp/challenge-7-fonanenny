// TODO: Definisikan tipe data untuk To-Do item di sini
// Hint: To-Do sebaiknya memiliki id, text, dan status completed

// TODO: Buat interface untuk To-Do item

// TODO: Buat tipe untuk status To-Do (active/done)

// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan

export type TodoStatus = 'active' | 'done';

// Interface utama Todo
export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
  createdAt: string; // ISO date string
}

// Interface untuk membuat todo baru (tanpa id & createdAt, di-generate otomatis)
export interface CreateTodoInput {
  title: string;
}
