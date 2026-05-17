// TODO: Definisikan path file untuk menyimpan data To-Do

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)

import fs from 'fs';
import path from 'path';
import { Todo } from './types';
import { isTodoArray } from './utils';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'todos.json');

// ── Pastikan folder data ada ──────────────────
function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ── Baca semua todo dari file JSON ────────────
export function readTodos(): Todo[] {
  try {
    ensureDataDir();

    if (!fs.existsSync(FILE_PATH)) {
      return [];
    }

    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    const data: unknown = JSON.parse(raw);

    // Type guard: pastikan data sesuai struktur Todo[]
    if (!isTodoArray(data)) {
      console.error('Warning.. Data di file tidak valid, mereset data...');
      return [];
    }

    return data;
  } catch (error) {
    console.error('Tetot.. Gagal membaca file:', (error as Error).message);
    return [];
  }
}

// ── Tulis todos ke file JSON ──────────────────
export function writeTodos(todos: Todo[]): void {
  try {
    ensureDataDir();
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Tetot... Gagal menyimpan data:', (error as Error).message);
  }
}
