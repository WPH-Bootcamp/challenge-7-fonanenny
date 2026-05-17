// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts

// TODO: Import fungsi storage untuk baca/tulis file

// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword

import { Todo, CreateTodoInput } from './types';
import { readTodos, writeTodos } from './storage';
import { generateId, formatDate } from './utils';

// ── Add: Tambah todo baru ─────────────────────
export function addTodo(input: CreateTodoInput): void {
  if (input.title.trim() === '') {
    console.log('Warning  Judul todo tidak boleh kosong!');
    return;
  }

  const todos: Todo[] = readTodos();

  const newTodo: Todo = {
    id: generateId(),
    title: input.title.trim(),
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  writeTodos(todos);

  console.log(`✅ Todo berhasil ditambahkan: "${newTodo.title}"`);
}

// ── Complete: Tandai todo sebagai done ────────
export function completeTodo(id: number): void {
  const todos: Todo[] = readTodos();
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    console.log(`⚠  Todo dengan ID ${id} tidak ditemukan.`);
    return;
  }

  if (todos[index].status === 'done') {
    console.log(`ℹ  Todo "${todos[index].title}" sudah selesai.`);
    return;
  }

  todos[index].status = 'done';
  writeTodos(todos);

  console.log(`✅ Todo "${todos[index].title}" ditandai selesai.`);
}

// ── Delete: Hapus todo berdasarkan id ─────────
export function deleteTodo(id: number): void {
  const todos: Todo[] = readTodos();
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    console.log(`⚠  Todo dengan ID ${id} tidak ditemukan.`);
    return;
  }

  const [removed] = todos.splice(index, 1);
  writeTodos(todos);

  console.log(`🗑  Todo "${removed.title}" berhasil dihapus.`);
}

// ── List: Tampilkan semua todo ────────────────
export function listTodos(): void {
  const todos: Todo[] = readTodos();

  console.log('\n📋 Daftar Todo');
  console.log('─'.repeat(50));

  if (todos.length === 0) {
    console.log('   Belum ada todo. Tambahkan todo pertamamu!');
    console.log('─'.repeat(50));
    return;
  }

  todos.forEach((todo: Todo, index: number) => {
    const label = todo.status === 'done' ? '[DONE]  ' : '[ACTIVE]';
    const num = String(index + 1).padEnd(3);
    const date = formatDate(todo.createdAt);

    console.log(`  ${label} ${num} ${todo.title}`);
    console.log(`           ID: ${todo.id} | Dibuat: ${date}`);
  });

  const activeCount = todos.filter((t) => t.status === 'active').length;
  const doneCount = todos.filter((t) => t.status === 'done').length;

  console.log('─'.repeat(50));
  console.log(
    `  Total: ${todos.length} | Aktif: ${activeCount} | Selesai: ${doneCount}`
  );
}
