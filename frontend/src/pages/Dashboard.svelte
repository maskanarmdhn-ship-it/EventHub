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
</script>

<div class="container mt-4">
    <h2 class="mb-4">Dashboard Eventhub </h2>

    <div class="card mb-4">

        <div class="card-header">
            Tambah Event
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

            <button
            class="btn btn-success"
            onclick={tambahEvent}
            >
                Simpan Event
            </button>

        </div>
    </div>

    <h3>Daftar Event</h3>

    {#if events.length ===0}

        <div class="alert alert-warning">
            Belum ada event
        </div>

    {:else}

        {#each events as event}

            <div class="card mb-3">

                <div class="card-body">

                    <h4>{event.judul}</h4>

                    <p>{event.deskripsi}</p>

                    <p><b>Tanggal : </b> {event.tanggal}</p>

                    <p><b>Lokasi : </b> {event.lokasi}</p>

                    <p><b>Kuota : </b> {event.kuota}</p>

                    <p><b>Pembuat : </b> {event.pembuat}</p>

                    <button class="btn btn-warning me-2">
                        Edit
                    </button>

                    <button class="btn btn-danger">
                        Hapus
                    </button>

                </div>

            </div>
        
        {/each}

    {/if}
        
</div>