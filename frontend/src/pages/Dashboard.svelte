<script>
    import {onMount} from "svelte";
    import api from "../services/api";
    import Swal from "sweetalert2";

    let events = [];

    let judul = "";
    let deskripsi = "";
    let tanggal = "";
    let lokasi = "";
    let kuota = "";
    let editId = null;

    async function loadEvent () {
        try {
            const response = await api.get("/event");
            events = response.data;
        } catch (err) {
            console.log(err);
        }
    }

    onMount(() => {
        loadEvent();
    });

    async function tambahEvent() {
        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/event",
                {
                    judul,
                    deskripsi,
                    tanggal,
                    lokasi,
                    kuota
                },
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            );

            Swal.fire({
                icon: "success",
                title: "Event berhasil ditambahkan"
            });

            judul = "";
            deskripsi = "";
            tanggal = "";
            lokasi = "";
            kuota = "";

            loadEvent();

        } catch (err) {

            console.log (err);

            Swal.fire({
                icon: "error",
                title: "Gagal menambahkan event"
            });
        }
    }

    function editEvent(event) {

        editId = event.id;

        judul = event.judul;
        deskripsi = event.deskripsi;
        tanggal = event.tanggal.split("T")[0];
        lokasi = event.lokasi;
        kuota = event.kuota;
    }

    async function updateEvent() {

        try {

            const token = localStorage.getItem("token");

            await api.put (
                `/event/${editId}`,
            {
                judul,
                deskripsi,
                tanggal,
                lokasi,
                kuota
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            Swal.fire ({
                icon: "success",
                title: "Event berhasil diupdate"
            });

            editId = null;

            judul = "";
            deskripsi = "";
            tanggal = "";
            lokasi = "";
            kuota = "";

            loadEvent();
        } catch (err) {

            console.log(err);

            Swal.fire({
                icon: "error",
                title: "Gagal mengupdate event"
            });
        }
    }


    async function hapusEvent(id) {

        const konfirmasi = await Swal.fire({
            title: "Hapus Event?",
            text: "Event yang dihapus tidak dapat dikembalikan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal"
        });

        if (!konfirmasi.isConfirmed) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await api.delete(
                `/event/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            Swal.fire({
                icon: "success",
                title: "Event berhasil dihapus"
            });

            loadEvent();

        }catch(err) {

            console.log(err);

            Swal.fire({
                icon: "error",
                title: "Gagal menghapus event"
            });
        }
    }

    async function logout() {

        const konfirmasi = await Swal.fire({
            title: "Log Out?",
            text: "Anda akan keluar dari akun.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Batal"
        });

        if (!konfirmasi.isConfirmed) {
            return;
        }

        localStorage.removeItem("token");

        Swal.fire ({
            icon: "success",
            title: "Logout berhasil",
            timer: 1000,
            showCancelButton: false
        });

        setTimeout (() => {
            window.location.href = "/";
        }, 1000);
    }



</script>

<div class="container mt-4">
<div class="card shadow-sm mb-4 border-0">

    <div class="card-body bg-primary text-white rounded d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="mb-0 fw-bold">🎉Dashboard Eventhub</h2>
            <small>Kelola seluruh event dengan mudah</small>
        </div>

        <button
        class="btn btn-light text-danger"
        onclick={logout}
        >
            Logout

        </button>
    </div>
</div>

    <div class="row">
        <div class="col-md-4">

             <div class="card mb-4">

        <div class="card-header bg-success text-white fw-bold">
            Tambah Event📝
        </div>

        <div class="card-body">

            <input
                bind:value={judul}
                class="form-control mb-3"
                placeholder="Judul Event"
            />

            <textarea
                bind:value={deskripsi}
                class="form-control mb-3"
                placeholder="Deskripsi"
            />

            <input
                bind:value={tanggal}
                class="form-control mb-3"
                type="date"
            />

            <input
                bind:value={lokasi}
                class="form-control mb-3"
                placeholder="Lokasi"
            />

            <input
                bind:value={kuota}
                class="form-control mb-3"
                type="number"
                placeholder="Kuota"
            />

            {#if editId === null}

            <button
            class="btn btn-success w-100 fw-bold"
            onclick={tambahEvent}
            >
                Simpan Event
            </button>

            {:else}

            <button
            class="btn btn-warning w-100 fw-bold"
            onclick={updateEvent}
            >
                Update event
            </button>

            <button
            class="btn btn-secondary w-100 mt-2"
            onclick={() => {

                editId = null;

                judul = "";
                deskripsi = "";
                tanggal = "";
                lokasi = "";
                kuota = "";

            }}
            >
                Batal

            </button>

            {/if}

        </div>
    
         </div>
    </div>

    <div class="col-md-8">

        <h3 class="mb-3">Daftar Event</h3>

    {#if events.length ===0}

        <div class="alert alert-warning">
            Belum ada event
        </div>

    {:else}

        {#each events as event}

            <div class="card shadow-sm border-0 mb-3">

                <div class="card-body">

                    <h4 class="fw-bold text-primary">
                        🎉{event.judul}
                    </h4>

                    <p>{event.deskripsi}</p>

                    <p>
                        🗓️<b>Tanggal : </b> 
                        {new Date(event.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                    </p>

                    <p>📍<b>Lokasi : </b> {event.lokasi}</p>

                    <p>👥<b>Kuota : </b> {event.kuota}</p>

                    <p>👤<b>Pembuat : </b> {event.pembuat}</p>

                    <button 
                    class="btn btn-warning btn-sm me-2"
                    onclick={ () => editEvent(event)}
                    >
                        Edit
                    </button>

                    <button 
                    class="btn btn-danger btn-sm"
                    onclick={() => hapusEvent(event.id)}>
                        Hapus
                    </button>

                </div>

            </div>
        
        {/each}

    {/if}

        </div>
</div>
        
</div>