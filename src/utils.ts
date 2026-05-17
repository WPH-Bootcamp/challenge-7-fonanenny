// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid

import { Todo } from './types';

// ── Type Guard: cek apakah sebuah value adalah Todo ──
export function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.createdAt === 'string' &&
    (obj.status === 'active' || obj.status === 'done')
  );
}

// ── Type Guard: cek apakah value adalah array of Todo ──
export function isTodoArray(value: unknown): value is Todo[] {
  return Array.isArray(value) && value.every(isTodo);
}

// ── Generate ID unik berdasarkan timestamp ──
export function generateId(): number {
  return Date.now();
}

// ── Format tanggal ke string yang mudah dibaca ──
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// ── Validasi input tidak boleh kosong ──
export function validateInput(input: string): boolean {
  return input.trim().length > 0;
}
