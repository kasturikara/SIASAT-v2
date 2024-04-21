import Swal from "sweetalert2";
import { supabase } from "./SupabaseClient";

export async function getUser() {
  const { data } = await supabase.from("user").select("*");
  if (!data) return console.error("Gagal mengambil data user dari supabase");
  console.log(data);
  return data;
}

/**
 * Mencari user berdasarkan username yang diberikan.
 * Jika user ditemukan, maka akan mengembalikan data user tersebut.
 * Jika user tidak ditemukan, maka akan menampilkan pesan error dan mengembalikan nilai undefined.
 */
export async function findUserByUsername({ user: { username } }) {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !data) {
    Swal.fire({
      title: "Oops!",
      text: "Username tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("findUserByUsername: ", error);
    return;
  }

  console.log("findUserByUsername: ", data);
  return data;
}

/**
 * Mencari user berdasarkan email yang diberikan.
 * Jika user ditemukan, maka akan mengembalikan data user tersebut.
 * Jika user tidak ditemukan, maka akan menampilkan pesan error dan mengembalikan nilai undefined.
 */
export async function findUserByEmail({ user: { email } }) {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    Swal.fire({
      title: "Oops!",
      text: "Email tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("findUserByEmail: ", error);
    return;
  }

  console.log("findUserByEmail: ", data);
  return data;
}
