import Swal from "sweetalert2";
import { supabase } from "./SupabaseClient";

//  ------------------user------------------
export async function getUser() {
  const { data } = await supabase
    .from("user")
    .select("*")
    .order("role", { ascending: true });
  if (!data) return console.error("Gagal mengambil data user dari supabase");

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
  return data;
}
export async function getUserByRole(role) {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("role", role);

  if (error || !data) {
    throw error || new Error("getUserByRole: select failed", error);
  }

  return data;
}

export async function postNewUser(data) {
  const { username, email, password, role } = data;
  const { error } = await supabase
    .from("user")
    .insert([{ username, email, password, role }]);

  if (error) {
    Swal.fire({
      title: "Oops!",
      text: "Gagal menambahkan user.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("postNewUser: ", error);
    return;
  }

  Swal.fire({
    title: "Success!",
    text: "User ditambahkan.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
export async function getUserById(id) {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("getUserById: ", error);
    return;
  }
  return data;
}
export async function updateUser(id, data) {
  const { username, email, password, role } = data;
  const { error } = await supabase
    .from("user")
    .update({ username, email, password, role })
    .eq("id", id);

  if (error) {
    console.error("updateUser: ", error);
    return;
  }
}
export async function hapusUser(id) {
  const { error } = await supabase.from("user").delete().eq("id", id);
  if (error) {
    console.error("deleteUser: ", error);
    return;
  }
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
}
export async function hapusPengumuman(id) {
  const { error } = await supabase.from("pengumuman").delete().eq("id", id);
  if (error) {
    console.error("HapusPengumuman: ", error);
    return;
  }
}

// ------------------kelas------------------
export async function getKelas() {
  try {
    const { data: kelasData, error: kelasError } = await supabase
      .from("kelas")
      .select("id,nama")
      .order("nama", { ascending: true });

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
    return res;
  } catch (error) {
    console.error("Gagal mengambil data kelas: ", error.message);
  }
}
export async function postNewKelas(data) {
  const { nama } = data;
  const { error } = await supabase.from("kelas").insert([{ nama }]);

  if (error) {
    console.error("postNewKelas: ", error);
    return;
  }
}
export async function getKelasById(id) {
  const { data, error } = await supabase
    .from("kelas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getKelasById: ", error);
    return;
  }
  return data;
}
export async function updateKelas(id, data) {
  const { nama } = data;
  const { error } = await supabase
    .from("kelas")
    .update([{ nama }])
    .eq("id", id);

  if (error) {
    console.error("updateKelas: ", error);
    return;
  }
}
export async function hapusKelas(id) {
  const { error } = await supabase.from("kelas").delete().eq("id", id);
  if (error) {
    console.error("HapusKelas: ", error);
    return;
  }
}

// ------------------murid------------------
export async function getMurid() {
  const { data: murid, error } = await supabase
    .from("murid")
    .select("*, kelas (nama), user (username, email)")
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

  return murid;
}
export async function postMurid(data) {
  if (!data) {
    throw new Error("postMurid: data is null or undefined");
  }

  const {
    nama,
    jenis_kelamin,
    tanggal_lahir,
    umur,
    alamat,
    id_kelas,
    id_user,
  } = data;

  const { error } = await supabase
    .from("murid")
    .insert([
      { nama, jenis_kelamin, tanggal_lahir, umur, alamat, id_kelas, id_user },
    ]);

  if (error) {
    throw error || new Error("postMurid: insert failed", error);
  }

  Swal.fire({
    title: "Success!",
    text: "Murid berhasil ditambahkan.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
export async function getMuridById(id) {
  const { data: murid, error } = await supabase
    .from("murid")
    .select("*, kelas (nama), user (username)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getMuridById: ", error);
    return;
  }
  return murid;
}
export async function updateMurid(id, data) {
  const {
    nama,
    jenis_kelamin,
    tanggal_lahir,
    umur,
    alamat,
    id_kelas,
    id_user,
  } = data;

  const { error } = await supabase
    .from("murid")
    .update({
      nama,
      jenis_kelamin,
      tanggal_lahir,
      umur,
      alamat,
      id_kelas,
      id_user,
    })
    .eq("id", id);
  if (error) {
    console.error("updateMurid: ", error);
    return;
  }
  Swal.fire({
    title: "Success!",
    text: "Murid berhasil diperbarui.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
export async function hapusMurid(id) {
  const { error } = await supabase.from("murid").delete().eq("id", id);
  if (error) {
    console.error("HapusMurid: ", error);
    return;
  }
}
export async function getMuridByKelas(kelas) {
  const { data: murid, error } = await supabase
    .from("murid")
    .select("*, kelas (nama), user (username)")
    .eq("id_kelas", kelas);
  if (error || !murid) {
    console.error("getMuridByKelas: ", error);
    return;
  }
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

  return jadwal;
}
export async function getJadwalByFilter(filter) {
  const { data: jadwal, error } = await supabase
    .from("jadwal")
    .select("*, kelas (nama), guru (nama, mapel (nama)))")
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

  return jadwal;
}
export async function postNewJadwal(data) {
  const { id_kelas, id_guru, hari, jam_mulai, jam_selesai } = data;
  const { error } = await supabase
    .from("jadwal")
    .insert([{ id_kelas, id_guru, hari, jam_mulai, jam_selesai }]);

  if (error) {
    throw error || new Error("postNewJadwal: insert failed", error);
  }

  Swal.fire({
    title: "Success!",
    text: "Jadwal baru telah ditambahkan.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
export async function getJadwalById(id) {
  const { data: jadwal, error } = await supabase
    .from("jadwal")
    .select("*, kelas (nama), guru (nama, mapel (nama)))")
    .eq("id", id)
    .single();

  if (error || !jadwal) {
    Swal.fire({
      title: "Oops!",
      text: "Jadwal tidak ditemukan.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("getJadwalById: ", error);
    return;
  }

  return jadwal;
}
export async function updateJadwal(id, data) {
  const { id_kelas, id_guru, hari, jam_mulai, jam_selesai } = data;
  const { error } = await supabase
    .from("jadwal")
    .update({ id_kelas, id_guru, hari, jam_mulai, jam_selesai })
    .eq("id", id);

  if (error) {
    throw error || new Error("updateJadwal: update failed", error);
  }
}
export async function hapusJadwal(id) {
  const { error } = await supabase.from("jadwal").delete().eq("id", id);
  if (error) {
    console.error("HapusJadwal: ", error);
    return;
  }
}

// ------------------absensi------------------
export async function getAbsensiByFilter(filter) {
  const { idKelas, tanggal } = filter;
  const { data: muridData, error: muridError } = await supabase
    .from("murid")
    .select("id")
    .eq("id_kelas", idKelas);
  if (muridError) {
    console.error("getAbsensiByFilter: ", muridError);
    return;
  }
  const muridIds = muridData.map((murid) => murid.id);

  // get absensi by id murid
  const { data: absensiData, error: absensiError } = await supabase
    .from("absensi")
    .select("*, murid (nama)")
    .in("id_murid", muridIds)
    .eq("tanggal", tanggal)
    .order("murid (nama)", { ascending: true });
  if (absensiError) {
    console.error("getAbsensiByFilter: ", absensiError);
    return;
  }
  return absensiData;
}

export async function postAbsensi(dataArray) {
  const { error } = await supabase.from("absensi").insert(dataArray, {
    // eslint-disable-next-line no-underscore-dangle
    _count: dataArray.length,
  });
  if (error) {
    throw error || new Error("postAbsensiMany: insertMany failed", error);
  }
}

export async function postNewAbsensi(data) {
  const { tanggal, id_murid, status } = data;

  const { error } = await supabase
    .from("absensi")
    .insert({ tanggal, id_murid, status });

  if (error) {
    throw error || new Error("postNewAbsensi: insert failed", error);
  }

  Swal.fire({
    title: "Success!",
    text: "Absensi berhasil ditambahkan.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
export async function getAbsensiById(id) {
  const { data: absensi, error } = await supabase
    .from("absensi")
    .select("*, murid (nama)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getAbsensiById: ", error);
    return;
  }
  return absensi;
}
export async function updateAbsensi(id, data) {
  const { tanggal, id_murid, status } = data;
  const { error } = await supabase
    .from("absensi")
    .update({ tanggal, id_murid, status })
    .eq("id", id);
  if (error) {
    console.error("updateAbsensi: ", error);
    return;
  }
  Swal.fire({
    title: "Success!",
    text: "Absensi berhasil diperbarui.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
export async function hapusAbsensi(id) {
  const { error } = await supabase.from("absensi").delete().eq("id", id);
  if (error) {
    console.error("HapusAbsensi: ", error);
    return;
  }
}

// ------------------nilai------------------
export async function getNilaiByMurid(murid) {
  const { data: nilai, error } = await supabase
    .from("nilai")
    .select("*, murid (id,nama), mapel (nama)")
    .eq("id_murid", murid)
    .order("tanggal", { ascending: true });

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

  return nilai;
}
export async function postNewNilai(data) {
  const { id_murid, id_mapel, nilai, jenis, tanggal } = data;
  const { error } = await supabase
    .from("nilai")
    .insert({ id_murid, id_mapel, nilai, jenis, tanggal });

  if (error) {
    throw error || new Error("postNewNilai: insert failed", error);
  }

  Swal.fire({
    title: "Success!",
    text: "Nilai berhasil ditambahkan.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
export async function getNilaiById(id) {
  const { data: nilai, error } = await supabase
    .from("nilai")
    .select("*, murid (id,nama), mapel (nama)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getNilaiById: ", error);
    return;
  }
  return nilai;
}
export async function updateNilai(id, data) {
  const { id_murid, id_mapel, nilai, jenis, tanggal } = data;
  const { error } = await supabase
    .from("nilai")
    .update({ id_murid, id_mapel, nilai, jenis, tanggal })
    .eq("id", id);
  if (error) {
    console.error("updateNilai: ", error);
    return;
  }
  Swal.fire({
    title: "Success!",
    text: "Nilai berhasil diperbarui.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
export async function hapusNilai(id) {
  const { error } = await supabase.from("nilai").delete().eq("id", id);
  if (error) {
    console.error("HapusNilai: ", error);
    return;
  }
}
export async function getNilaiByMuridAndMapel(idMurid, idMapel) {
  const { data: nilai, error } = await supabase
    .from("nilai")
    .select("*, murid (id,nama), mapel (nama)")
    .eq("id_murid", idMurid)
    .eq("id_mapel", idMapel)
    .order("tanggal", { ascending: true });
  if (error || !nilai) {
    console.error("getNilaiByMuridAndMapel: ", error);
    return;
  }
  return nilai;
}

// ------------------guru------------------
export async function getGuru() {
  const { data: guru, error } = await supabase
    .from("guru")
    .select("*, mapel (nama), user (username, email)")
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
  return guru;
}
export async function postNewGuru(data) {
  if (!data) {
    throw new Error("postNewGuru: data is null or undefined");
  }

  const {
    nama,
    jenis_kelamin,
    tanggal_lahir,
    umur,
    alamat,
    id_mapel,
    id_user,
  } = data;

  const { error } = await supabase
    .from("guru")
    .insert([
      { nama, jenis_kelamin, tanggal_lahir, umur, alamat, id_mapel, id_user },
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
    .select("*, mapel (nama), user (username)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getGuruById: ", error);
  }

  return guru;
}
export async function updateGuru(id, data) {
  const {
    nama,
    jenis_kelamin,
    tanggal_lahir,
    umur,
    alamat,
    id_mapel,
    id_user,
  } = data;
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
        id_user,
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
}
export async function hapusGuru(id) {
  const { error } = await supabase.from("guru").delete().eq("id", id);
  if (error) {
    console.error("deleteGuru: ", error);
    return;
  }
}
export async function getGuruByUser(user) {
  const { id } = user;
  const { data, error } = await supabase
    .from("guru")
    .select("*, mapel (nama, materi (deskripsi))")
    .eq("id_user", id)
    .single();
  if (error) {
    console.error("getGuruByUser: ", error);
  }
  return data;
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

  return mapel;
}
export async function postNewMapel(data) {
  if (!data) {
    throw new Error("postNewMapel: data is null or undefined");
  }

  const { nama } = data;

  const { error } = await supabase.from("mapel").insert([{ nama }]);

  if (error) {
    throw error || new Error("postNewMapel: insert failed", error);
  }

  Swal.fire({
    title: "Success!",
    text: "Mapel baru telah ditambahkan.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
export async function getMapelById(id) {
  const { data: mapel, error } = await supabase
    .from("mapel")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getMapelById: ", error);
  }

  return mapel;
}
export async function updateMapel(id, data) {
  const { nama } = data;
  const { error } = await supabase
    .from("mapel")
    .update([{ nama }])
    .eq("id", id);
  if (error) {
    console.error("updateMapel: ", error);
    return;
  }
  Swal.fire({
    title: "Success!",
    text: "Mapel telah diperbarui.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
export async function hapusMapel(id) {
  const { error } = await supabase.from("mapel").delete().eq("id", id);
  if (error) {
    console.error("deleteMapel: ", error);
    return;
  }
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

  return materi;
}
export async function postNewMateri(data) {
  if (!data) {
    throw new Error("postNewMateri: data is null or undefined");
  }

  const { deskripsi, id_guru, id_mapel } = data;

  if (!deskripsi || !id_guru || !id_mapel) {
    throw new Error(
      "postNewMateri: deskripsi, id_guru, dan id_mapel harus diisi"
    );
  } else {
    const { error } = await supabase.from("materi").insert([
      {
        deskripsi,
        id_guru,
        id_mapel,
      },
    ]);

    if (error) {
      throw error || new Error("postNewMateri: insert failed", error);
    }
  }
}
export async function getMateriById(id) {
  const { data: materi, error } = await supabase
    .from("materi")
    .select("*, guru (nama), mapel (nama)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getMateriById: ", error);
  }

  return materi;
}
export async function updateMateri(id, data) {
  const { deskripsi, id_guru, id_mapel } = data;

  const { error } = await supabase
    .from("materi")
    .update([{ deskripsi, id_guru, id_mapel }])
    .eq("id", id);

  if (error) {
    console.error("updateMateri: ", error);
    return;
  }
}
export async function hapusMateri(id) {
  const { error } = await supabase.from("materi").delete().eq("id", id);
  if (error) {
    console.error("deleteMateri: ", error);
    return;
  }
}
export async function getMateriByGuru(guru) {
  console.log("getMateriBy: ", guru);
}
