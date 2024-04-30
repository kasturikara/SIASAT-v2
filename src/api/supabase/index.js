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

  // console.log("findUserByUsername: ", data);
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

  // console.log("findUserByEmail: ", data);
  return data;
}

// pengumuman
export async function getPengumuman() {
  const { data, error } = await supabase
    .from("pengumuman")
    .select("*")
    .order("tanggal", { ascending: true });

  if (error || !data) {
    Swal.fire({
      title: "Oops!",
      text: "Pengumuman tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("getPengumuman: ", error);
    return;
  }
  // console.log("getPengumuman: ", data);
  return data;
}

export async function postNewPengumuman(pengumuman) {
  if (!pengumuman) {
    throw new Error("postNewPengumuman: pengumuman is null or undefined");
  }

  const { judul, isi, tanggal } = pengumuman;
  // console.log("postNewPengumuman: ", [{ judul, isi, tanggal }]);

  const { error } = await supabase
    .from("pengumuman")
    .insert([{ judul, isi, tanggal }]);

  if (error) {
    throw error || new Error("postNewPengumuman: insert failed", error);
  }

  Swal.fire({
    title: "Success!",
    text: "Pengumuman berhasil ditambahkan.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}

export async function hapusPengumuman(id) {
  const { error } = await supabase.from("pengumuman").delete().eq("id", id);
  if (error) {
    console.error("HapusPengumuman: ", error);
    return;
  }
  // console.log("HapusPengumuman: ", id);
}

export async function getPengumumanById(id) {
  const { data, error } = await supabase
    .from("pengumuman")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getPengumumanById: ", error);
    return;
  }
  // console.log("getPengumumanById: ", data);
  return data;
}

export async function updatePengumuman(id, pengumuman) {
  const { judul, isi, tanggal } = pengumuman;
  const { error } = await supabase
    .from("pengumuman")
    .update([{ judul, isi, tanggal }])
    .eq("id", id);
  if (error) {
    console.error("updatePengumuman: ", error);
    return;
  }
  Swal.fire({
    title: "Success!",
    text: "Pengumuman berhasil diperbarui.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
  console.log("updatePengumuman: ", id, pengumuman);
}

// kelas
export async function getKelas() {
  const { data, error } = await supabase
    .from("kelas")
    .select("*")
    .order("nama", { ascending: true });

  if (error || !data) {
    Swal.fire({
      title: "Oops!",
      text: "Kelas tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("getKelas: ", error);
    return;
  }
  // console.log("getKelas: ", data);

  return data;
}

// murid
export async function getMurid() {
  const { data: murid, error } = await supabase
    .from("murid")
    .select("*, kelas (nama)")
    .order("nama", { ascending: true });

  if (error || !murid) {
    Swal.fire({
      title: "Oops!",
      text: "Murid tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("getMurid: ", error);
    return;
  }
  // console.log("getMurid: ", murid);

  return murid;
}
