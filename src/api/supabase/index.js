import Swal from "sweetalert2";
import { supabase } from "./SupabaseClient";

//  ------------------user------------------
export async function getUser() {
  const { data } = await supabase.from("user").select("*");
  if (!data) return console.error("Gagal mengambil data user dari supabase");
  console.log(data);
  return data;
}
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

// ------------------pengumuman------------------
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
  // console.log("updatePengumuman: ", id, pengumuman);
}
export async function hapusPengumuman(id) {
  const { error } = await supabase.from("pengumuman").delete().eq("id", id);
  if (error) {
    console.error("HapusPengumuman: ", error);
    return;
  }
  // console.log("HapusPengumuman: ", id);
}

// ------------------kelas------------------
export async function getKelas() {
  try {
    const { data: kelasData, error: kelasError } = await supabase
      .from("kelas")
      .select("id,nama");

    if (kelasError) throw kelasError;
    const res = [];

    for (const kelas of kelasData) {
      const { data: muridData, error: muridError } = await supabase
        .from("murid")
        .select("*")
        .eq("id_kelas", kelas.id);

      if (muridError) throw muridError;

      res.push({
        id: kelas.id,
        kelas: kelas.nama,
        jml_murid: muridData ? muridData.length : 0,
      });
    }

    console.log("res: ", res);
    return res;
  } catch (error) {
    console.error("Gagal mengambil data kelas: ", error.message);
  }
}

// ------------------murid------------------
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

// ------------------jadwal------------------
export async function getJadwal() {
  const { data: jadwal, error } = await supabase
    .from("jadwal")
    .select("*, kelas (nama), mapel (nama, materi(deskripsi))");

  if (error || !jadwal) {
    Swal.fire({
      title: "Oops!",
      text: "Jadwal tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("getJadwal: ", error);
    return;
  }
  // console.log("getJadwal: ", jadwal);

  return jadwal;
}
export async function getJadwalByFilter(filter) {
  const { data: jadwal, error } = await supabase
    .from("jadwal")
    .select("*, kelas (nama), mapel (nama, materi(deskripsi))")
    .eq("id_kelas", filter);

  if (error || !jadwal) {
    Swal.fire({
      title: "Oops!",
      text: "Jadwal tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("getJadwalByFilter: ", error);
    return;
  }
  // console.log("getJadwalByFilter: ", jadwal);

  return jadwal;
}

// ------------------absensi------------------
export async function getAbsensiByFilter(filter) {
  const { data: absensi, error } = await supabase
    .from("absensi")
    .select("*, murid (nama)")
    .eq("tanggal", filter);

  if (error || !absensi) {
    Swal.fire({
      title: "Oops!",
      text: "Absensi tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("getAbsensiByFilter: ", error);
    return;
  }
  // console.log("getAbsensiByFilter: ", absensi);

  return absensi;
}

// ------------------nilai------------------
export async function getNilaiByMurid(murid) {
  const { data: nilai, error } = await supabase
    .from("nilai")
    .select("*, murid (id,nama), mapel (nama)")
    .eq("id_murid", murid);

  if (error || !nilai) {
    Swal.fire({
      title: "Oops!",
      text: "Nilai tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("getNilaiByMurid: ", error);
    return;
  }
  // console.log("getNilaiByMurid: ", nilai);

  return nilai;
}

// ------------------guru------------------
export async function getGuru() {
  const { data: guru, error } = await supabase
    .from("guru")
    .select("*, mapel (nama)")
    .order("nama", { ascending: true });

  if (error || !guru) {
    Swal.fire({
      title: "Oops!",
      text: "Guru tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("getGuru: ", error);
    return;
  }
  // console.log("getGuru: ", guru);

  return guru;
}
export async function postNewGuru(data) {
  if (!data) {
    throw new Error("postNewGuru: data is null or undefined");
  }

  const { nama, jenis_kelamin, tanggal_lahir, umur, alamat, mapel } = data;

  const { error } = await supabase
    .from("guru")
    .insert([
      { nama, jenis_kelamin, tanggal_lahir, umur, alamat, id_mapel: mapel },
    ]);

  if (error) {
    throw error || new Error("postNewGuru: insert failed", error);
  }

  Swal.fire({
    title: "Success!",
    text: "Guru baru telah ditambahkan.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
export async function getGuruById(id) {
  const { data: guru, error } = await supabase
    .from("guru")
    .select("*, mapel (nama)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getGuruById: ", error);
  }
  // console.log("getGuruById: ", guru);

  return guru;
}
export async function updateGuru(id, data) {
  const { nama, jenis_kelamin, tanggal_lahir, umur, alamat, id_mapel } = data;
  const { error } = await supabase
    .from("guru")
    .update([
      {
        nama,
        jenis_kelamin,
        tanggal_lahir,
        umur,
        alamat,
        id_mapel,
      },
    ])
    .eq("id", id);
  if (error) {
    console.error("updateGuru: ", error);
    return;
  }
  Swal.fire({
    title: "Success!",
    text: "Guru telah diperbarui.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
  // console.log("updateGuru: ", data);
}
export async function hapusGuru(id) {
  const { error } = await supabase.from("guru").delete().eq("id", id);
  if (error) {
    console.error("deleteGuru: ", error);
    return;
  }
}

// ------------------mapel------------------
export async function getMapel() {
  const { data: mapel, error } = await supabase
    .from("mapel")
    .select("*")
    .order("nama", { ascending: true });

  if (error || !mapel) {
    Swal.fire({
      title: "Oops!",
      text: "Mapel tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("getMapel: ", error);
    return;
  }
  // console.log("getMapel: ", mapel);

  return mapel;
}

// ------------------materi------------------
export async function getMateri() {
  const { data: materi, error } = await supabase
    .from("materi")
    .select("*, guru (nama), mapel (nama)")
    .order("deskripsi", { ascending: true });

  if (error || !materi) {
    Swal.fire({
      title: "Oops!",
      text: "Materi tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });

    console.error("getMateri: ", error);
    return;
  }
  // console.log("getMateri: ", materi);

  return materi;
}
