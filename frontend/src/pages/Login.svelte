<script>
    import api from "../services/api";
    import Swal from "sweetalert2";

    let {onLogin} = $props();

    let email = "";
    let password = "";

    async function login() {

        try{

            const response = await api.post("/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            await Swal.fire({
                icon : "success",
                title : "Login Berhasil"
            });

            onLogin();

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text: "Email atau Password salah"
            });
        }
    }

</script>

<div class="container mt-5">

    <div class="row justify-content-center">

        <div class="col-md-5">

            <div class="card shadow">

                <div class="card-body">

                    <h2 class="text-center mb-4">
                        Eventhub Login
                    </h2>

                    <input
                        bind:value={email}
                        class="form-control mb-3"
                        type="email"
                        placeholder="Email"
                    />

                    <input
                        bind:value={password}
                        class="form-control mb-3"
                        type="password"
                        placeholder="Password"
                    />

                    <button 
                        class="btn btn-primary w-100"
                        on:click={login}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>